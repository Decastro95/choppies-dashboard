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

# Prompt for version bump type
echo "Current version: $current_tag"
echo "Select version bump type:"
echo "1) Patch (bug fix)"
echo "2) Minor (new feature)"
echo "3) Major (breaking change / redesign)"
read -p "Enter 1, 2, or 3: " bump

case $bump in
  1)
    patch=$((patch+1))
    ;;
  2)
    minor=$((minor+1))
    patch=0
    ;;
  3)
    major=$((major+1))
    minor=0
    patch=0
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac

new_tag="v$major.$minor.$patch"

# Create and push new tag
git tag -a "$new_tag" -m "$msg"
git push origin "$new_tag"

echo "✅ Committed and tagged as $new_tag"
