#!/bin/bash
set -e

echo "🚀 Starting full migration and project cleanup..."

ARCHIVE_DIR="src/archive"

# 1️⃣ Format code with Prettier
echo "🔹 Running Prettier to format code..."
npx prettier --write "src/**/*.{ts,tsx,js,jsx,css,json}"

# 2️⃣ Restore original logic from archive
echo "🔹 Restoring original logic from $ARCHIVE_DIR..."
find "$ARCHIVE_DIR" -type f | while read archive_file; do
    BASENAME=$(basename "$archive_file")
    NAME="${BASENAME%.*}"
    DIRNAME=$(dirname "$archive_file" | sed "s|$ARCHIVE_DIR|src|")
    EXT="${BASENAME##*.}"

    NEW_EXT="$EXT"
    if [[ "$EXT" == "jsx" ]]; then
        NEW_EXT="tsx"
    elif [[ "$EXT" == "js" ]]; then
        NEW_EXT="ts"
    fi

    NEW_FILE="$DIRNAME/$NAME.$NEW_EXT"
    mkdir -p "$DIRNAME"

    # Hooks
    if [[ "$NAME" == use* && "$EXT" != "ts" ]]; then
        echo "✏️ Restoring hook $NAME"
        cat > "$NEW_FILE" <<EOL
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const $NAME = (): AuthContextType => {
  return useContext(AuthContext);
};
EOL
        continue
    fi

    # Services
    if [[ "$DIRNAME" == *services* ]]; then
        echo "✏️ Restoring service $NAME"
        sed 's/^\s*module\.exports\s*=/export default/' "$archive_file" > "$NEW_FILE" 2>/dev/null || cp "$archive_file" "$NEW_FILE"
        continue
    fi

    # Components
    if [[ "$EXT" == "jsx" || "$EXT" == "js" ]]; then
        echo "✏️ Restoring component $NAME"
        cat "$archive_file" | sed "1iimport React from 'react';" > "$NEW_FILE"
    fi
done

# 3️⃣ Update all imports in TS/TSX files
echo "🔹 Fixing imports in TS/TSX files..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read tsfile; do
    sed -i -E 's/(\.\/[a-zA-Z0-9_/-]+)\.jsx?/\1/g' "$tsfile"
done

# 4️⃣ Install missing ESLint plugins
echo "🔹 Installing ESLint React plugins..."
npm install eslint-plugin-react@latest eslint-plugin-react-hooks@latest --save-dev

# 5️⃣ Run ESLint auto-fix
echo "🔹 Running ESLint..."
npx eslint "src/**/*.{ts,tsx}" --fix || true

# 6️⃣ Run TypeScript type check
echo "🔹 Running TypeScript check..."
npx tsc --noEmit

# 7️⃣ Test Vite build
echo "🔹 Running Vite build..."
npx vite build --config vite.config.ts

echo "✅ Full migration and cleanup completed!"
echo "Run 'npm run dev' to start your development server."
