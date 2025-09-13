#!/bin/bash

# Prompt for commit message
read -p "Enter commit message: " msg

# Stage all changes
git add .

# Commit changes
git commit -m "$msg"

# Push commit
git push

# Get current latest tag
current_tag=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -z "$current_tag" ]; then
  current_tag="v0.0.0"
fi

# Parse current version
IFS='.' read -r major minor patch <<< "${current_tag#v}"

# Determine next version automatically
# If commit message contains BREAKING, it's major
# If commit message contains FEAT, it's minor
# Else, patch
if [[ "$msg" =~ [Bb][Rr][Ee][Aa][Kk][Ii][Nn][Gg] ]]; then
  major=$((major+1))
  minor=0
  patch=0
  echo "Detected BREAKING change → major bump"
elif [[ "$msg" =~ [Ff][Ee][Aa][Tt] ]]; then
  minor=$((minor+1))
  patch=0
  echo "Detected FEAT → minor bump"
else
  patch=$((patch+1))
  echo "No BREAKING/FEAT → patch bump"
fi

new_tag="v$major.$minor.$patch"

# Create and push new tag
git tag -a "$new_tag" -m "$msg"
git push origin "$new_tag"

echo "✅ Committed and automatically tagged as $new_tag"
