import re
with open("tools/content/guides.js", "r") as f:
    text = f.read()

# Replace the HTML generated version in guides.js since we just converted everything to literal HTML string template blocks!
old_q_html = """          <div class="q-head"><span>Question 8 of 20</span><span>PPC</span></div>
          <div class="q-body">
            <p class="q-text">In Google Ads, what determines your ad rank?</p>
            <label class="opt"><input type="radio" name="q8"> Only your maximum bid</label>
            <label class="opt"><input type="radio" name="q8"> Only your quality score</label>
            <label class="opt" data-correct><input type="radio" name="q8"> Your bid amount multiplied by your Quality Score</label>
            <label class="opt"><input type="radio" name="q8"> The age of your account</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Ad Rank balances how much you're willing to pay with how relevant and useful your ad is.</div>"""

new_q_html = """          <div class="q-head"><span>Question 8 of 20</span><span>PPC</span></div>
          <div class="q-body">
            <p class="q-text">In Google Ads, what determines your Ad Rank at auction time?</p>
            <label class="opt"><input type="radio" name="q8"> Your maximum bid multiplied by your 1-10 Quality Score</label>
            <label class="opt" data-correct><input type="radio" name="q8"> Multiple auction-time factors including bid, ad/landing page quality, competitiveness, search context, and format impact</label>
            <label class="opt"><input type="radio" name="q8"> Only your maximum bid and the age of your Google Ads account</label>
            <label class="opt"><input type="radio" name="q8"> The daily budget divided by the number of clicks</label>
            <button class="check-btn">Check answer</button>
          </div>
          <div class="q-explain"><b>Why:</b> Ad Rank is determined by multiple real-time factors including bid, auction competitiveness, context, format impact, and ad/landing page quality. Quality Score (the 1-10 number) is a diagnostic tool, not a direct auction input. <a href="https://support.google.com/google-ads/answer/1722122" target="_blank" rel="noopener">Official Reference</a></div>"""

if old_q_html in text:
    text = text.replace(old_q_html, new_q_html)
    with open("tools/content/guides.js", "w") as f:
        f.write(text)
    print("Replaced HTML block!")
else:
    print("HTML block not found.")
