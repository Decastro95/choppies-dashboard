#!/bin/bash

# =========================
# Dynamic Git auto-commit script
# =========================

# Get the current branch name
branch=$(git branch --show-current)

# Get all changed folders (excluding node_modules and .git)
folders=$(git status --porcelain | awk '{print $2}' | sed 's|/.*||' | sort -u | grep -vE "^(node_modules|.git)$")

# Commit each folder separately
for folder in $folders; do
  if [ -d "$folder" ]; then
    git add "$folder"
    git commit -m "Update $folder folder"
  fi
done

# Commit remaining top-level files (that are not in a folder)
top_files=$(git status --porcelain | awk '{print $2}' | grep -v /)
if [ ! -z "$top_files" ]; then
  git add $top_files
  git commit -m "Update top-level files"
fi

# Push all commits
git push origin "$branch"

echo "✅ All changes committed and pushed to branch '$branch'."
