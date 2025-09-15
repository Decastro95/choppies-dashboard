#!/bin/bash
# auto_push.sh - auto stage, commit, and push current branch, bypass Husky/ESLint

# Detect current branch
current_branch=$(git branch --show-current)

if [ -z "$current_branch" ]; then
  echo "Error: Could not detect current branch. Are you in a git repo?"
  exit 1
fi

# Default commit message
commit_msg="Auto commit: bypass Husky and ESLint errors"

# Stage all changes
git add -A

# Commit changes without running Husky/ESLint
git commit -m "$commit_msg" --no-verify

# Push to current branch
git push origin "$current_branch"

echo "✅ All changes pushed successfully to branch '$current_branch'!"
