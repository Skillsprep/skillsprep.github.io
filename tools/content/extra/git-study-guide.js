module.exports = [
  { h: "The mental model: snapshots, pointers and HEAD", body: `
<p>Most Git confusion disappears once you stop picturing "changes" and start picturing <b>snapshots</b>. Each commit records the full state of your tracked files at one moment, plus a pointer to its parent commit (two parents for a merge commit). Commits are identified by a hash and never change; "editing" a commit actually creates a new one.</p>
<p>Your files live in three places at once:</p>
<table>
<tr><th>Area</th><th>What it holds</th><th>Moves on</th></tr>
<tr><td>Working tree</td><td>The actual files you edit</td><td>You saving a file</td></tr>
<tr><td>Index (staging area)</td><td>The proposed next snapshot</td><td><code>git add</code></td></tr>
<tr><td>Repository</td><td>Committed history</td><td><code>git commit</code></td></tr>
</table>
<p>A <b>branch</b> is just a movable label pointing at one commit. Creating a branch costs almost nothing because no files are copied; committing moves the current branch's label forward. <b>HEAD</b> is Git's "you are here": normally it points at a branch name, which points at a commit. If HEAD points straight at a commit, you are in a <i>detached HEAD</i> state; commits you make there are not on any branch, so create one (<code>git switch -c rescue</code>) before moving away.</p>
<pre><code>git log --oneline --graph --all    # see labels and shape of history
git branch                         # list branches, * marks the current one
git switch -c fix-typo             # create and move to a new branch</code></pre>
<div class="callout tip"><b>Tip</b> Because branches are labels, deleting a merged branch with <code>git branch -d</code> removes only the label, never the commits reachable from elsewhere.</div>` },

  { h: "Merging, rebasing and conflicts", body: `
<p>Suppose you branched <code>feature</code> from <code>main</code>. When you merge, Git does one of two things.</p>
<ul>
<li><b>Fast-forward:</b> if <code>main</code> has not moved since you branched, Git simply slides the <code>main</code> label forward to your latest commit. No new commit is created and history stays a straight line.</li>
<li><b>Merge commit:</b> if both branches gained commits, Git combines them and records a new commit with two parents. History keeps its real branching shape. You can force this even when a fast-forward is possible with <code>git merge --no-ff</code>.</li>
</ul>
<p><b>Rebase</b> takes your branch's commits and replays them, one by one, on top of another commit. The replayed commits are brand-new commits with new hashes; the old ones are abandoned. The payoff is a linear history with no merge commit.</p>
<pre><code>git switch feature
git rebase main        # replay feature's commits onto the tip of main</code></pre>
<p>The rule that follows from this: <b>never rebase commits that other people already have</b>. If a teammate based work on the old commits, your rewritten ones look unrelated to their copy, and reconciling the two is painful. Rebasing your own unpublished branch is fine. If you do rewrite a branch only you use after pushing it, <code>git push --force-with-lease</code> is safer than a plain force push because it refuses to overwrite commits you have not seen.</p>
<p><b>Resolving conflicts.</b> A conflict happens when both sides changed the same lines. Git stops and marks the file:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
timeout = 30
=======
timeout = 60
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</code></pre>
<p>The top block is your current side, the bottom block is the incoming side. Edit the file to the final text you want and delete all three marker lines. Then run <code>git add file</code> and either <code>git commit</code> (merge) or <code>git rebase --continue</code> (rebase). To back out entirely, use <code>git merge --abort</code> or <code>git rebase --abort</code>. Always rerun your tests afterwards, since a clean-looking merge can still be logically wrong.</p>` },

  { h: "Undoing: reset, revert, restore and the reflog", body: `
<p>Choosing the right undo tool comes down to two questions: <i>has the commit been shared?</i> and <i>what should happen to my files?</i></p>
<table>
<tr><th>Command</th><th>Branch pointer</th><th>Index</th><th>Working tree</th></tr>
<tr><td><code>reset --soft HEAD~1</code></td><td>Moves back</td><td>Unchanged (changes stay staged)</td><td>Unchanged</td></tr>
<tr><td><code>reset --mixed HEAD~1</code> (default)</td><td>Moves back</td><td>Reset to match</td><td>Unchanged (changes stay as edits)</td></tr>
<tr><td><code>reset --hard HEAD~1</code></td><td>Moves back</td><td>Reset to match</td><td>Reset to match (edits discarded)</td></tr>
</table>
<p><code>git restore</code> works on files rather than branches. <code>git restore file</code> discards unstaged edits to that file; <code>git restore --staged file</code> unstages it while keeping the edits. <code>git revert &lt;commit&gt;</code> leaves history intact and adds a new commit that applies the opposite change, so it is the right choice once a commit is public.</p>
<p>Worked case: you committed a debug line and have not pushed. Use <code>git reset --mixed HEAD~1</code>, delete the line, and commit again. If it was already pushed to a shared branch, use <code>git revert</code> instead.</p>
<p><b>The reflog is your safety net.</b> Git keeps a local log of where HEAD and your branches have pointed. After a bad reset or a deleted branch, <code>git reflog</code> lists earlier positions, and you can return with <code>git reset --hard &lt;hash&gt;</code> or <code>git switch -c recovered &lt;hash&gt;</code>. Limits to remember: the reflog is local to your clone, entries expire eventually, and it cannot bring back uncommitted work that <code>reset --hard</code> or <code>restore</code> threw away, because those edits were never recorded in a commit.</p>
<div class="callout"><b>Before any --hard</b> Run <code>git status</code> and <code>git diff</code>. If anything uncommitted matters, commit or stash it first.</div>` },

  { h: "Ignoring, stashing and tagging", body: `
<p><b>.gitignore.</b> This file lists patterns for untracked files Git should not offer to add: build output, dependency folders, editor settings, secrets files.</p>
<pre><code>node_modules/
*.log
.env
!keep.log</code></pre>
<p>A leading <code>!</code> re-includes a path, and a trailing slash matches directories only. The classic mistake: ignore rules do <i>not</i> apply to files that are already tracked. If you committed <code>.env</code> by accident, adding it to .gitignore is not enough. Run <code>git rm --cached .env</code> to stop tracking it while keeping the file on disk, and commit. Remember it remains in earlier history, so a real secret should also be rotated.</p>
<p><b>Stash.</b> When you must switch tasks with a half-done working tree, <code>git stash</code> shelves tracked modifications and returns you to a clean state. <code>git stash list</code> shows entries, <code>git stash pop</code> reapplies the newest and removes it, and <code>git stash apply</code> reapplies but keeps it. By default untracked files are not stashed; add <code>-u</code> to include them. Stashes are easy to forget, so use them for minutes rather than weeks.</p>
<p><b>Tags.</b> A tag is a fixed label on a commit, typically marking a release. Unlike a branch, it does not move when you commit.</p>
<pre><code>git tag v1.2.0                       # lightweight: just a name
git tag -a v1.2.0 -m "Release 1.2.0" # annotated: stores author, date, message
git push origin v1.2.0               # tags are not pushed automatically</code></pre>
<p>Annotated tags are the usual choice for releases because they carry metadata. A plain <code>git push</code> does not send tags, which surprises many beginners.</p>` },

  { h: "A team workflow, practice plan and glossary", body: `
<p>A common feature-branch and pull-request flow looks like this:</p>
<ol>
<li>Update your base: <code>git switch main</code> then <code>git pull</code>.</li>
<li>Create a branch named for the work: <code>git switch -c feature/search-filter</code>.</li>
<li>Make small, focused commits with messages that explain why, not just what.</li>
<li>Push the branch: <code>git push -u origin feature/search-filter</code>. The <code>-u</code> sets the upstream so later pushes need no arguments.</li>
<li>Open a pull request on your hosting service. Teammates review, comment and request changes; you push further commits to the same branch and the request updates.</li>
<li>After approval and passing checks, the branch is merged. Teams differ on whether they use a merge commit, a squash into one commit, or a rebase merge, so follow your team's convention.</li>
<li>Delete the finished branch and pull the updated <code>main</code>.</li>
</ol>
<p>If <code>main</code> moved while you worked, bring those changes in before review, either by merging <code>main</code> into your branch or, if the branch is private to you, rebasing onto it. Pull requests are a feature of hosting platforms, not of Git itself.</p>
<p><b>How to practise.</b> Make a throwaway folder with <code>git init</code> and rehearse safely: create a fast-forward merge and a merge commit and compare their graphs; cause a conflict on purpose; try all three reset modes and check <code>git status</code> after each; delete a branch and recover it from the reflog. Reading <code>git log --oneline --graph --all</code> after every step builds the pointer picture quickly.</p>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td>Index</td><td>Another name for the staging area</td></tr>
<tr><td>HEAD</td><td>Pointer to the commit (usually via a branch) you currently have checked out</td></tr>
<tr><td>Remote</td><td>A named copy of the repository elsewhere, such as <code>origin</code></td></tr>
<tr><td>Upstream</td><td>The remote branch your local branch tracks</td></tr>
<tr><td>Detached HEAD</td><td>HEAD pointing at a commit rather than a branch</td></tr>
<tr><td>Squash</td><td>Combining several commits into one</td></tr>
</table>` }
];
