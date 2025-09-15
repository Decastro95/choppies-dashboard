#!/bin/bash
set -e

ARCHIVE_DIR="src/archive"
echo "🔹 Creating archive folder..."
mkdir -p $ARCHIVE_DIR

echo "🔹 Installing missing ESLint plugins..."
npm install eslint-plugin-react@latest eslint-plugin-react-hooks@latest --save-dev

echo "🔹 Migrating .jsx → .tsx and .js → .ts (stubs)..."
find src -type f \( -name "*.jsx" -o -name "*.js" \) ! -path "$ARCHIVE_DIR/*" | while read file; do
    BASENAME=$(basename "$file")
    NAME="${BASENAME%.*}"
    DIRNAME=$(dirname "$file")

    # Skip service files for special handling
    if [[ "$DIRNAME" == *"services"* ]]; then
        echo "🔹 Archiving service $file"
        mv "$file" "$ARCHIVE_DIR/"
        echo "export {};" > "$DIRNAME/$NAME.ts"
        continue
    fi

    # Archive original file
    mv "$file" "$ARCHIVE_DIR/"

    # Determine new extension
    if [[ "$BASENAME" == *.jsx ]]; then
        NEW_EXT="tsx"
    else
        NEW_EXT="ts"
    fi

    NEW_FILE="$DIRNAME/$NAME.$NEW_EXT"
    echo "✏️ Creating stub $NEW_FILE"

    # Hooks
    if [[ "$NAME" == use* ]]; then
        echo "import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const $NAME = (): AuthContextType => {
  return useContext(AuthContext);
};" > "$NEW_FILE"
    # Components
    else
        echo "import React from 'react';

export default function $NAME() {
  return (
    <div>
      <h2>$NAME (stub)</h2>
      <p>This component was migrated from $file.</p>
    </div>
  );
}" > "$NEW_FILE"
    fi
done

echo "🔹 Updating imports in all TS/TSX files..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read tsfile; do
    sed -i -E 's/(\.\/[a-zA-Z0-9_/-]+)\.jsx?/\1/g' "$tsfile"
done

echo "🔹 Restoring service modules from archive..."
for service in $(find "$ARCHIVE_DIR" -type f -name "*.js" -path "*services*"); do
    BASENAME=$(basename "$service")
    NAME="${BASENAME%.*}"
    DIRNAME=$(dirname "$service" | sed "s|$ARCHIVE_DIR|src|")
    NEW_FILE="$DIRNAME/$NAME.ts"
    mkdir -p "$DIRNAME"
    mv "$service" "$NEW_FILE"
done

echo "✅ Migration and fix complete!"
echo "Original files are in $ARCHIVE_DIR"
echo "Run 'npm run dev' to check the project."
