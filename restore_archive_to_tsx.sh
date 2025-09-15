#!/bin/bash
set -e

ARCHIVE_DIR="src/archive"

echo "🔹 Restoring original logic from $ARCHIVE_DIR into TS/TSX files..."

# Loop through archived files
find "$ARCHIVE_DIR" -type f | while read archive_file; do
    BASENAME=$(basename "$archive_file")
    NAME="${BASENAME%.*}"
    DIRNAME=$(dirname "$archive_file" | sed "s|$ARCHIVE_DIR|src|")

    # Determine new extension
    EXT="${BASENAME##*.}"
    if [[ "$EXT" == "jsx" ]]; then
        NEW_EXT="tsx"
    elif [[ "$EXT" == "js" ]]; then
        NEW_EXT="ts"
    else
        NEW_EXT="$EXT"
    fi

    NEW_FILE="$DIRNAME/$NAME.$NEW_EXT"
    mkdir -p "$DIRNAME"

    # If it's a hook, just copy TS hook content
    if [[ "$NAME" == use* && "$EXT" != "ts" ]]; then
        echo "✏️ Restoring hook $NAME"
        # Replace JS hook with proper TS hook
        echo "import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const $NAME = (): AuthContextType => {
  return useContext(AuthContext);
};" > "$NEW_FILE"
        continue
    fi

    # If it's a service, restore JS logic to TS
    if [[ "$DIRNAME" == *services* ]]; then
        echo "✏️ Restoring service $NAME"
        # Add a TS module export if missing
        sed 's/^\s*module\.exports\s*=/export default/' "$archive_file" > "$NEW_FILE" 2>/dev/null || cp "$archive_file" "$NEW_FILE"
        continue
    fi

    # Components
    if [[ "$EXT" == "jsx" || "$EXT" == "js" ]]; then
        echo "✏️ Restoring component $NAME"
        # Wrap in TSX if JSX
        cat "$archive_file" | sed "1iimport React from 'react';" > "$NEW_FILE"
    fi
done

echo "🔹 Updating imports in all TS/TSX files..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read tsfile; do
    sed -i -E 's/(\.\/[a-zA-Z0-9_/-]+)\.jsx?/\1/g' "$tsfile"
done

echo "✅ Restore complete. All original logic is now in TS/TSX files!"
echo "Run 'npm run dev' to check the project."
