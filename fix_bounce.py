with open("tools/content/guides.js", "r") as f:
    text = f.read()

old_q_html = """          <div class="q-head"><span>Question 10 of 20</span><span>Analytics</span></div>
          <div class="q-body">
            <p class="q-text">What is a 'bounce' in Google Analytics?</p>
            <label class="opt"><input type="radio" name="q10"> A user who visits multiple pages rapidly</label>
            <label class="opt" data-correct><input type="radio" name="q10"> A single-page session where the user leaves without interacting</label>
            <label class="opt"><input type="radio" name="q10"> An email that cannot be delivered</label>
            <label class="opt"><input type="radio" name="q10"> A broken link</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A bounce occurs when a user lands on a page and leaves without triggering any other requests.</div>"""

new_q_html = """          <div class="q-head"><span>Question 10 of 20</span><span>Analytics</span></div>
          <div class="q-body">
            <p class="q-text">How is bounce rate defined in Google Analytics 4 (GA4)?</p>
            <label class="opt"><input type="radio" name="q10"> A single-page session where the user leaves without interacting</label>
            <label class="opt" data-correct><input type="radio" name="q10"> The percentage of sessions that were not engaged sessions</label>
            <label class="opt"><input type="radio" name="q10"> When an email marketing campaign cannot be delivered</label>
            <label class="opt"><input type="radio" name="q10"> The number of times a user clicks the back button</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> In GA4, bounce rate is the percentage of sessions that were not "engaged sessions." An engaged session lasts longer than 10 seconds, has a key event, or has at least 2 pageviews. (The older UA definition was simply a single-page session without interaction.) <a href="https://support.google.com/analytics/answer/12195621" target="_blank" rel="noopener">Official Reference</a></div>"""

if old_q_html in text:
    text = text.replace(old_q_html, new_q_html)
    with open("tools/content/guides.js", "w") as f:
        f.write(text)
    print("Replaced HTML block!")
else:
    print("HTML block not found.")
