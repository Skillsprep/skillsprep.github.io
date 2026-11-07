with open("tools/content/guides.js", "r") as f:
    text = f.read()

old_q_html = """          <div class="q-head"><span>Question 8 of 20</span><span>Promises</span></div>
          <div class="q-body">
            <p class="q-text">What is the equivalent of &#96;Promise.resolve(5)&#96; using async/await syntax?</p>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;async function() { return 5; }&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;await 5&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;function() { await 5; }&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;async(5)&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> An &#96;async&#96; function implicitly wraps its return value in a Promise.</div>"""

new_q_html = """          <div class="q-head"><span>Question 8 of 20</span><span>Promises</span></div>
          <div class="q-body">
            <p class="q-text">What is an executing equivalent of &#96;Promise.resolve(5)&#96; using an immediately invoked async function expression (IIFE)?</p>
            <label class="opt" data-correct><input type="radio" name="q8"> &#96;(async () =&gt; 5)()&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;async function() { return 5; }&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;await 5&#96;</label>
            <label class="opt"><input type="radio" name="q8"> &#96;function() { await 5; }()&#96;</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> An executing &#96;async&#96; function implicitly wraps its return value in a Promise, immediately producing a resolved Promise of 5. Simply defining the function (without calling it) only creates a function reference. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve" target="_blank" rel="noopener">MDN Web Docs</a></div>"""

if old_q_html in text:
    text = text.replace(old_q_html, new_q_html)
    with open("tools/content/guides.js", "w") as f:
        f.write(text)
    print("Replaced HTML block!")
else:
    print("HTML block not found.")
