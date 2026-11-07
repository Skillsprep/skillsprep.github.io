with open("tools/content/guides.js", "r") as f:
    text = f.read()

old_q_html = """          <div class="q-head"><span>Question 19 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of a robots.txt file?</p>
            <label class="opt"><input type="radio" name="q19"> To animate website graphics</label>
            <label class="opt" data-correct><input type="radio" name="q19"> To tell search engine crawlers which pages they can or cannot request</label>
            <label class="opt"><input type="radio" name="q19"> To hack other websites</label>
            <label class="opt"><input type="radio" name="q19"> To store user passwords</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Robots.txt manages crawler traffic and prevents indexing of irrelevant files.</div>"""

new_q_html = """          <div class="q-head"><span>Question 19 of 20</span><span>SEO</span></div>
          <div class="q-body">
            <p class="q-text">What is the purpose of a robots.txt file?</p>
            <label class="opt"><input type="radio" name="q19"> To animate website graphics</label>
            <label class="opt" data-correct><input type="radio" name="q19"> To tell search engine crawlers which pages they can or cannot request</label>
            <label class="opt"><input type="radio" name="q19"> To strictly prevent pages from being indexed by search engines</label>
            <label class="opt"><input type="radio" name="q19"> To store user passwords</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> A robots.txt file manages crawler traffic to avoid overloading your site. It is <strong>not</strong> a mechanism to keep a webpage out of Google. To prevent indexing, you must use <code>noindex</code> tags. <a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" target="_blank" rel="noopener">Official Reference</a></div>"""

if old_q_html in text:
    text = text.replace(old_q_html, new_q_html)
    with open("tools/content/guides.js", "w") as f:
        f.write(text)
    print("Replaced HTML block!")
else:
    print("HTML block not found.")
