module.exports = [
  { h: "Names, objects and mutability: what assignment really does", body: `
<p>In Python a variable is a <b>name</b> that points to an object, not a box that holds a value. Writing <code>b = a</code> does not copy anything; it makes a second name for the same object. For immutable objects such as numbers, strings and tuples this never matters, because you cannot change the object in place. For mutable objects such as lists, dicts and sets it matters a lot, because a change made through one name is visible through every other name.</p>
<pre><code>a = [1, 2, 3]
b = a            # same object, two names
b.append(4)
print(a)         # [1, 2, 3, 4]

c = a.copy()     # new list, same elements
c.append(5)
print(a)         # [1, 2, 3, 4]  (unchanged)</code></pre>
<p>Use <code>==</code> to ask "do these have equal values?" and <code>is</code> to ask "are these the exact same object?". Reserve <code>is</code> for singletons, mainly <code>x is None</code>. Comparing numbers or strings with <code>is</code> can appear to work because the interpreter sometimes reuses objects, but that is an implementation detail you must not rely on.</p>
<p>Copies come in two depths. <code>list.copy()</code>, <code>list(x)</code> and slicing <code>x[:]</code> make <b>shallow</b> copies: the outer list is new, but the inner objects are shared. For a list of lists, use <code>copy.deepcopy</code>. A related trap is <code>grid = [[0] * 3] * 3</code>, which builds three references to the same inner list; write <code>[[0] * 3 for _ in range(3)]</code> instead.</p>
<p>Augmented assignment is another subtle spot. For a list, <code>x += [1]</code> mutates the existing object, while <code>x = x + [1]</code> builds a new list and rebinds the name. This difference shows up when a list is passed into a function: the first form changes the caller's list, the second does not.</p>
<div class="callout"><b>Interview reasoning</b> Python passes <i>references to objects by value</i> (often called "pass by assignment"). Inside a function, parameter names start as aliases of the caller's objects. Mutating the object is visible outside; rebinding the parameter name is not.</div>` },
  { h: "Scope and the LEGB rule", body: `
<p>When Python meets a name it searches four scopes in order: <b>L</b>ocal (the current function), <b>E</b>nclosing (any outer functions), <b>G</b>lobal (the module) and <b>B</b>uilt-in (names like <code>len</code>). The first match wins. This is why a local variable called <code>list</code> or <code>max</code> hides the built-in, and why later calls such as <code>list("abc")</code> suddenly fail.</p>
<p>The rule that surprises beginners: if a function assigns to a name anywhere in its body, that name is local for the <i>whole</i> function. So this fails:</p>
<pre><code>count = 0

def bump():
    count += 1      # UnboundLocalError: count is local here

def bump_ok():
    global count
    count += 1</code></pre>
<p>Reading a global needs no declaration; rebinding it does. Inside a nested function, use <code>nonlocal</code> to rebind a variable of the enclosing function. Prefer returning values or using a small class over reaching for <code>global</code>, because hidden shared state makes code hard to test.</p>
<p>Closures capture <i>variables</i>, not values, and look the value up when the inner function runs. That produces the well-known late-binding surprise:</p>
<pre><code>funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])        # [2, 2, 2]

funcs = [lambda i=i: i for i in range(3)]
print([f() for f in funcs])        # [0, 1, 2]</code></pre>
<p>The fix binds the current value as a default argument at definition time.</p>
<p>A practical way to debug scope problems is to ask three questions in order. Is the name assigned anywhere in this function? If so, it is local everywhere in it. If not, which enclosing function or module defines it? Finally, did something earlier in the file rebind it to a different object, such as a loop variable reusing the name of a function? Printing <code>locals()</code> inside the function shows exactly which names Python treats as local.</p>
<div class="callout"><b>Common mistake</b> Naming a variable after a built-in (<code>id</code>, <code>list</code>, <code>sum</code>, <code>input</code>) works at first, then breaks later code that expects the built-in. Pick descriptive names instead.</div>` },
  { h: "Iterators and generators", body: `
<p>An <b>iterable</b> is anything you can loop over; it has an <code>__iter__</code> method that returns an <b>iterator</b>. An iterator has <code>__next__</code>, returns one item at a time, and raises <code>StopIteration</code> when it runs out. A <code>for</code> loop is just sugar: it calls <code>iter()</code> once, then calls <code>next()</code> repeatedly until <code>StopIteration</code>. A list is iterable but not itself an iterator.</p>
<p>A <b>generator function</b> is the easy way to write an iterator. Any function containing <code>yield</code> returns a generator object when called, and its body does not run until you ask for the first value. Each <code>next()</code> runs the body up to the next <code>yield</code>, then pauses with all local state preserved.</p>
<pre><code>def countdown(n):
    while n &gt; 0:
        yield n
        n -= 1

g = countdown(3)
print(next(g))      # 3
print(list(g))      # [2, 1]
print(list(g))      # []  exhausted</code></pre>
<p>Two consequences matter in practice. First, generators are <b>single-use</b>: once exhausted they yield nothing, so looping a second time silently gives an empty result. If you need several passes, build a list or recreate the generator. Second, generators are <b>lazy</b>, so they hold one item in memory at a time. A generator expression such as <code>sum(x * x for x in range(1000000))</code> avoids building a million-item list.</p>
<p><b>Comprehension or loop?</b> Use a comprehension when you are building one new collection from one iterable with a simple filter. Switch to a regular loop when you need several statements, early exit with <code>break</code>, or side effects like printing. A comprehension with two nested <code>for</code> clauses and an <code>if</code> is usually harder to read than the loop it replaces.</p>
<div class="callout tip"><b>Debugging tip</b> If a generator-based result is unexpectedly empty, check whether something earlier already consumed it, for example a <code>list(g)</code> or a <code>for</code> loop over the same object.</div>` },
  { h: "Exceptions, dataclasses and type hints", body: `
<p>Good exception handling is about being <b>specific</b>. Catch the narrowest exception you can actually handle, and keep the <code>try</code> block small so you know which line failed. A bare <code>except:</code> also catches <code>KeyboardInterrupt</code> and <code>SystemExit</code>, which is almost never what you want; <code>except Exception</code> is the broadest reasonable choice. The <code>else</code> block runs only when no exception occurred, and <code>finally</code> runs in every case, which makes it the right place for cleanup (though a <code>with</code> statement is usually neater).</p>
<pre><code>def read_age(text):
    try:
        age = int(text)
    except ValueError as err:
        raise ValueError("age must be a whole number") from err
    else:
        return age</code></pre>
<p>The <code>raise ... from err</code> form keeps the original error attached as the cause, which makes tracebacks far easier to debug. Inside an <code>except</code> block, a plain <code>raise</code> re-raises the current exception unchanged. Prefer "ask forgiveness" (try, then handle the error) when failure is rare, and a simple <code>if</code> check when the failure case is common and cheap to test.</p>
<p>The <code>dataclasses</code> module removes the boilerplate from classes that mainly store data. Decorating a class with <code>@dataclass</code> generates <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> from the annotated fields. A mutable default such as a list is rejected with a <code>ValueError</code>, which neatly prevents the shared-default bug; use <code>field(default_factory=list)</code> instead.</p>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Order:
    id: int
    items: list[str] = field(default_factory=list)
    note: str | None = None</code></pre>
<p>Type hints (<code>list[str]</code>, and <code>str | None</code> on Python 3.10+) document intent and let tools like mypy or your editor catch mistakes. The interpreter itself does <b>not</b> enforce them at runtime: passing a string where <code>int</code> is annotated will still run.</p>` },
  { h: "Virtual environments, practice plan and glossary", body: `
<p>A <b>virtual environment</b> is an isolated folder holding its own Python interpreter link and installed packages, so one project's dependencies cannot break another's. The standard-library way to make one:</p>
<pre><code>python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
python -m pip install requests
python -m pip freeze &gt; requirements.txt</code></pre>
<p>Calling <code>python -m pip</code> guarantees pip belongs to the interpreter you are running. A common mistake is installing packages while no environment is active, then wondering why the editor cannot find them. Keep the environment folder out of version control and commit <code>requirements.txt</code> instead so others can recreate it.</p>
<p><b>How to practise.</b> Predict before you run: write down what each snippet in this section prints, then check. Use <code>id(x)</code> and <code>is</code> in the REPL to watch aliasing happen. Rewrite one of your own loops as a generator and compare memory by eye on a large range. Finally, deliberately trigger <code>UnboundLocalError</code>, <code>StopIteration</code> and a dataclass default error once each so the messages look familiar in an interview or a real bug.</p>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Alias</td><td>A second name bound to the same object</td></tr>
<tr><td>Shallow copy</td><td>New outer container, shared inner objects</td></tr>
<tr><td>Iterator</td><td>Object with <code>__next__</code> that yields items one by one</td></tr>
<tr><td>Generator</td><td>Iterator created by a function with <code>yield</code></td></tr>
<tr><td>Closure</td><td>Inner function that keeps access to enclosing variables</td></tr>
<tr><td>Late binding</td><td>Closure looks up a variable's value when called, not defined</td></tr>
</table>` }
];
