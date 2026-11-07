with open("tools/content/guides.js", "r") as f:
    text = f.read()

# I will replace the line in final tips, and maybe add a specific explanation to the .gitignore question

old_gitignore_q = """          <div class="q-explain"><b>Why:</b> It prevents temporary files, build artifacts, or secrets from being accidentally committed.</div>"""

new_gitignore_q = """          <div class="q-explain"><b>Why:</b> It prevents temporary files, build artifacts, or uncommitted secrets from being accidentally committed. Note: adding an already-tracked file to <code>.gitignore</code> does not remove it from tracking or history. <a href="https://git-scm.com/docs/gitignore" target="_blank" rel="noopener">Official Reference</a></div>"""

text = text.replace(old_gitignore_q, new_gitignore_q)


old_tips = """          <li>Understand <code>.gitignore</code> purpose — ignoring build artifacts and secrets</li>"""

new_tips = """          <li>Understand <code>.gitignore</code> purpose — preventing untracked build artifacts and secrets from being committed.</li>
          <li><b>Security Warning:</b> <code>.gitignore</code> does not automatically remove files already tracked by Git. If you accidentally commit a secret, adding it to <code>.gitignore</code> later is not safe. You must remove the secret from tracking (e.g., <code>git rm --cached</code>), immediately rotate/revoke the exposed credentials, and consider cleaning the repository history.</li>"""

text = text.replace(old_tips, new_tips)

with open("tools/content/guides.js", "w") as f:
    f.write(text)
