#!/bin/bash

ARCHIVE_DIR="src/archive"
echo "🔹 Creating archive folder..."
mkdir -p $ARCHIVE_DIR

echo "🔹 Finding all .jsx and .js files..."
find src -type f \( -name "*.jsx" -o -name "*.js" \) ! -path "$ARCHIVE_DIR/*" | while read file; do
    BASENAME=$(basename "$file")
    NAME="${BASENAME%.*}"
    DIRNAME=$(dirname "$file")

    # Archive original file
    mv "$file" "$ARCHIVE_DIR/"

    # Determine new extension
    if [[ "$BASENAME" == *.jsx ]]; then
        NEW_EXT="tsx"
    else
        NEW_EXT="ts"
    fi

    NEW_FILE="$DIRNAME/$NAME.$NEW_EXT"

    echo "✏️ Creating stub for $NEW_FILE"

    # Determine if file is a hook or component
    if [[ "$NAME" == use* ]]; then
        # Hook stub
        echo "export function $NAME() {
  console.warn('This is an archived stub of $file.');
  return null;
}" > "$NEW_FILE"
    else
        # Component stub
        echo "import React from 'react';

export default function $NAME() {
  return (
    <div>
      <h2>$NAME (archived)</h2>
      <p>This component was migrated from $file.</p>
    </div>
  );
}" > "$NEW_FILE"
    fi
done

echo "🔹 Updating imports in all TS/TSX files..."
# Replace old imports pointing to .js/.jsx files
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read tsfile; do
    sed -i -E 's/(\.\/[a-zA-Z0-9_/-]+)\.jsx?/\1/g' "$tsfile"
done

echo "✅ Migration complete. Original files are archived in $ARCHIVE_DIR."
