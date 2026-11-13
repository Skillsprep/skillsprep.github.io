module.exports = [
  { h: "Closures and the value of this", body: `
<p>A <b>closure</b> is a function together with the variables from the place where it was created. The function keeps access to those variables even after the outer function has returned. Closures give you private state and are behind callbacks, event handlers and many module patterns.</p>
<pre><code>function makeCounter() {
  let n = 0;
  return () =&gt; ++n;
}
const a = makeCounter();
a(); a();          // 1, then 2
const b = makeCounter();
b();               // 1  (separate n)</code></pre>
<p>Each call to <code>makeCounter</code> creates a fresh <code>n</code>, so the two counters do not interfere. The classic loop question tests the same idea. With <code>var</code>, one variable is shared by the whole function, so callbacks created in the loop all see its final value. With <code>let</code>, each iteration gets its own binding.</p>
<pre><code>for (var i = 0; i &lt; 3; i++) setTimeout(() =&gt; console.log(i));   // 3 3 3
for (let j = 0; j &lt; 3; j++) setTimeout(() =&gt; console.log(j));   // 0 1 2</code></pre>
<p><code>this</code> is decided by <i>how a function is called</i>, not where it is written, except for arrow functions. The rules, in practice:</p>
<ul>
<li><code>obj.method()</code>: <code>this</code> is <code>obj</code>.</li>
<li>A plain call <code>fn()</code>: <code>this</code> is <code>undefined</code> in strict mode (modules and classes are strict), otherwise the global object.</li>
<li><code>fn.call(x)</code>, <code>fn.apply(x)</code>, <code>fn.bind(x)</code>: <code>this</code> is <code>x</code>.</li>
<li><code>new Fn()</code>: <code>this</code> is the new object.</li>
<li>Arrow function: no <code>this</code> of its own; it uses the one from the surrounding code.</li>
</ul>
<p>The common bug is detaching a method: <code>const f = obj.method; f()</code> loses <code>obj</code>. The same happens when you pass <code>obj.method</code> as a callback. Fix it with <code>obj.method.bind(obj)</code> or by wrapping it in an arrow function. Do not use an arrow function as an object method that needs <code>this</code> to be the object, because it will pick up the outer <code>this</code> instead.</p>` },
  { h: "Equality and coercion without memorising tables", body: `
<p>You do not need to memorise every <code>==</code> result if you remember how it works. <code>===</code> compares type and value with no conversion. <code>==</code> first converts operands when their types differ, mostly towards numbers. Two special cases are worth knowing: <code>null == undefined</code> is true, and neither equals anything else under <code>==</code>, so <code>null == 0</code> is false.</p>
<table>
<tr><th>Expression</th><th>Result</th><th>Why</th></tr>
<tr><td><code>"5" == 5</code></td><td>true</td><td>string converted to number</td></tr>
<tr><td><code>"5" + 3</code></td><td>"53"</td><td><code>+</code> concatenates if either side is a string</td></tr>
<tr><td><code>"5" - 3</code></td><td>2</td><td><code>-</code> always converts to numbers</td></tr>
<tr><td><code>null == 0</code></td><td>false</td><td>null only loosely equals undefined</td></tr>
<tr><td><code>NaN === NaN</code></td><td>false</td><td>NaN is never equal to anything</td></tr>
<tr><td><code>typeof null</code></td><td>"object"</td><td>long-standing quirk of the language</td></tr>
</table>
<p>To test for NaN use <code>Number.isNaN(x)</code> or <code>Object.is(x, NaN)</code>. Prefer <code>===</code> by default. One idiom where <code>== null</code> is deliberate is checking "null or undefined" in one go, and many teams allow that single exception.</p>
<p>Truthiness bugs hide behind <code>||</code>. In <code>const port = config.port || 3000</code>, a legitimate port of <code>0</code> is falsy and gets replaced. The nullish operator <code>??</code> only falls back on <code>null</code> or <code>undefined</code>, so <code>config.port ?? 3000</code> keeps the 0. Likewise, <code>?.</code> stops and returns <code>undefined</code> when it meets null or undefined, instead of throwing.</p>
<div class="callout tip"><b>Debugging tip</b> When a comparison surprises you, log <code>typeof</code> of both sides first. Values read from inputs, query strings and JSON often arrive as strings even when they look like numbers.</div>` },
  { h: "The event loop: how await fits in", body: `
<p>JavaScript runs your code on a single thread. Waiting work (timers, network, events) is handled by the environment, and when it finishes, a callback is queued. After the current synchronous code ends, the engine first runs <b>all</b> queued microtasks (promise reactions and <code>queueMicrotask</code>), including any that those microtasks add, and only then takes the next macrotask such as a timer callback. This is why a long chain of promises can delay a <code>setTimeout(..., 0)</code>, and why an endless microtask loop freezes the page.</p>
<p><code>await</code> is promise syntax in disguise. The code before the first <code>await</code> runs synchronously; the rest of the function becomes a microtask continuation that resumes once the awaited promise settles. Predict this output:</p>
<pre><code>async function f() {
  console.log("a");
  await null;
  console.log("b");
}
console.log("1");
f();
setTimeout(() =&gt; console.log("t"));
console.log("2");
// 1, a, 2, b, t</code></pre>
<p>Walk through it: "1" prints; <code>f()</code> runs synchronously and prints "a", then pauses at <code>await</code> and returns; the timer is registered; "2" prints; the stack empties, so the microtask runs and prints "b"; finally the timer macrotask prints "t".</p>
<p>A typical interview follow-up is to explain why <code>await</code> inside a plain <code>for</code> loop runs requests one after another, whereas starting all promises first and passing them to <code>Promise.all</code> runs them concurrently. Be ready to say which you need: sequential when each step depends on the previous, concurrent when they are independent.</p>` },
  { h: "Promise and async error handling", body: `
<p>Errors in promise code travel along the chain until something handles them. A <code>.catch()</code> at the end of a chain catches a rejection from any earlier step, and the same applies to a <code>try/catch</code> around <code>await</code>. A throw inside an async function becomes a rejected promise rather than a synchronous exception, so a <code>try/catch</code> around the <i>call</i> alone does not catch it unless you <code>await</code> it.</p>
<pre><code>async function loadUser(id) {
  try {
    const res = await fetch("/api/users/" + id);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error("loadUser failed:", err.message);
    throw err;            // let the caller decide too
  }
}</code></pre>
<p>Three mistakes appear again and again:</p>
<ul>
<li><b>Trusting fetch to reject on 404 or 500.</b> It only rejects on network failure; always check <code>res.ok</code>.</li>
<li><b>Forgetting await.</b> You get a pending promise instead of the value, and a later rejection may go unhandled.</li>
<li><b>Using async callbacks in forEach.</b> <code>forEach</code> ignores the promises its callback returns, so nothing waits. Use a <code>for...of</code> loop with <code>await</code>, or <code>Promise.all(items.map(...))</code>.</li>
</ul>
<p>Choosing a combinator: <code>Promise.all</code> rejects as soon as any input rejects ("fail fast"). <code>Promise.allSettled</code> always waits and reports each outcome as fulfilled or rejected, which suits batches where partial success is fine. <code>Promise.race</code> settles with the first input to settle, handy for timeouts.</p>
<p>When you debug a rejected promise, read the stack trace from the bottom up to find the first <code>await</code> or <code>.then</code> that was involved, and add a <code>.catch</code> or <code>try/catch</code> there while you investigate. Browsers and Node both report rejections that nobody handled, so treat that warning as a real bug rather than noise. Also remember that <code>.finally()</code> runs whether the promise fulfilled or rejected, which makes it the right place to hide a loading spinner.</p>
<div class="callout"><b>Watch out</b> Swallowing an error in <code>catch</code> without logging or rethrowing hides bugs. Decide at each level whether you can truly recover.</div>` },
  { h: "Array methods, immutability and a practice plan", body: `
<p>Know what each array method <i>returns</i> and whether it <i>mutates</i>. <code>map</code>, <code>filter</code>, <code>slice</code> and <code>concat</code> return new arrays and leave the original alone. <code>push</code>, <code>pop</code>, <code>splice</code>, <code>reverse</code> and <code>sort</code> change the array in place. <code>sort</code> is the one that catches people twice: with no comparator it compares items as strings, so <code>[10, 9, 1].sort()</code> gives <code>[1, 10, 9]</code>. Pass a comparator such as <code>(a, b) =&gt; a - b</code> for numbers.</p>
<p><code>reduce</code> folds an array into one value. Always supply the initial value: without it an empty array throws a TypeError, and the first element silently becomes the accumulator, which is wrong when you are building an object or a sum of mapped fields.</p>
<pre><code>const totals = orders.reduce((acc, o) =&gt; {
  acc[o.type] = (acc[o.type] || 0) + o.amount;
  return acc;
}, {});</code></pre>
<p>Immutable updates avoid surprising shared changes. Use spread to build copies: <code>[...list, item]</code> to add, <code>list.filter(x =&gt; x.id !== id)</code> to remove, <code>{ ...user, name: "Sam" }</code> to update. Remember that spread and <code>Object.assign</code> copy only one level, so nested objects are still shared. <code>Object.freeze</code> is also shallow. For a true deep copy of plain data, <code>structuredClone</code> is available in modern browsers and Node.</p>
<p><b>How to practise.</b> Take any snippet in this guide, hide the comment with the answer, and write your prediction first. Use the browser console or Node to confirm, then change one thing (<code>let</code> to <code>var</code>, <code>await</code> removed) and predict again. Keep a personal list of surprises; it becomes your revision sheet.</p>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Closure</td><td>Function plus the variables it was created with</td></tr>
<tr><td>Microtask</td><td>Promise reaction run before the next macrotask</td></tr>
<tr><td>Macrotask</td><td>Timer or event callback taken one per loop turn</td></tr>
<tr><td>Coercion</td><td>Automatic conversion between types</td></tr>
<tr><td>Shallow copy</td><td>Copy of the top level only; nested objects shared</td></tr>
</table>` }
];
