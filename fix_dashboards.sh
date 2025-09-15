#!/bin/bash
set -e

echo "🔹 Fixing supabase.ts exports..."
SUPABASE_FILE="src/supabase.ts"
if ! grep -q "export { Database }" "$SUPABASE_FILE"; then
  echo "export { Database };" >> "$SUPABASE_FILE"
  echo "✅ Exported Database in supabase.ts"
else
  echo "✅ Database already exported"
fi

echo "🔹 Fixing AuthContext.tsx exports..."
AUTH_FILE="src/context/AuthContext.tsx"
if ! grep -q "export { AuthContext }" "$AUTH_FILE"; then
  echo -e "\nexport { AuthContext };" >> "$AUTH_FILE"
  echo "✅ Exported AuthContext in AuthContext.tsx"
else
  echo "✅ AuthContext already exported"
fi

echo "🔹 Updating dashboard imports..."
DASHBOARD_DIR="src/pages/Dashboard"
for file in $DASHBOARD_DIR/*DashboardContent.tsx; do
  echo "📄 Fixing $file imports..."
  sed -i "s|import { Database } from \"../../supabase\";|import { Database } from \"../../supabase\";|g" "$file"
  sed -i "s|import { useAuth } from \"../../context/AuthContext\";|import { AuthContext, useAuth } from \"../../context/AuthContext\";|g" "$file"
done

echo "🔹 Updating routes.tsx imports..."
ROUTES_FILE="src/routes.tsx"
sed -i "s|import { useAuth } from \"../hooks/useAuth\";|import useAuth from \"../hooks/useAuth\";|g" "$ROUTES_FILE"

echo "🔹 Running TypeScript check..."
npx tsc --noEmit

echo "🎉 Dashboard fixes applied successfully!"
