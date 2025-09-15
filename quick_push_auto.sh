#!/bin/bash
# quick_push_auto.sh - stage, commit, and push everything bypassing Husky/ESLint, auto-detect branch

# Get current branch
current_branch=$(git branch --show-current)

if [ -z "$current_branch" ]; then
  echo "Could not detect current branch. Are you in a git repo?"
  exit 1
fi

# Prompt for commit message
read -p "Enter commit message for branch '$current_branch': " msg

# If no message is provided, use a default one
if [ -z "$msg" ]; then
  msg="Temp commit: bypass Husky and ESLint errors"
fi

# Stage all changes
git add -A

# Commit without running Husky hooks
git commit -m "$msg" --no-verify

# Push to the detected branch
git push origin "$current_branch"

echo "Changes pushed successfully to branch '$current_branch'!"
