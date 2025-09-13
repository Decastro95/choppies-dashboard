#!/bin/bash

# Prompt for commit message
read -p "Enter commit message: " msg

# Stage all changes in the project
git add .

# Commit changes
git commit -m "$msg"

# Push commit to main branch
git push origin main

# Get the latest tag
latest_tag=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -z "$latest_tag" ]; then
  latest_tag="v0.0.0"
fi

# Parse the version
IFS='.' read -r major minor patch <<< "${latest_tag#v}"

# Determine version bump based on commit message
if [[ "$msg" =~ [Bb][Rr][Ee][Aa][Kk][Ii][Nn][Gg] ]]; then
    major=$((major+1))
    minor=0
    patch=0
    echo "BREAKING change detected → major bump"
elif [[ "$msg" =~ [Ff][Ee][Aa][Tt] ]]; then
    minor=$((minor+1))
    patch=0
    echo "FEAT detected → minor bump"
else
    patch=$((patch+1))
    echo "Default → patch bump"
fi

# Create the new tag
new_tag="v$major.$minor.$patch"
git tag -a "$new_tag" -m "$msg"

# Push the tag
git push origin "$new_tag"

echo "✅ Commit and tag $new_tag pushed successfully!"
