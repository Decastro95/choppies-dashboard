#!/bin/bash

# -------------------------------
# 1️⃣ Fix tsconfig.json for JSX
# -------------------------------
echo "Updating tsconfig.json to enable JSX..."
jq '.compilerOptions.jsx="react-jsx"' tsconfig.json > tsconfig.tmp.json && mv tsconfig.tmp.json tsconfig.json

# -------------------------------
# 2️⃣ Fix AuthContext exports
# -------------------------------
echo "Fixing AuthContext exports..."
sed -i 's/export export const/AuthContext/export const/' src/context/AuthContext.tsx
sed -i 's/const AuthContext = createContext/export const AuthContext = createContext/' src/context/AuthContext.tsx

# -------------------------------
# 3️⃣ Fix Supabase duplicate exports
# -------------------------------
echo "Removing duplicate Database exports..."
sed -i 's/export { Database };[[:space:]]*export { Database };/export { Database };/' src/supabase.ts

# -------------------------------
# 4️⃣ Fix Supabase .from() generics in dashboard files
# -------------------------------
echo "Fixing Supabase .from() generics..."

DASHBOARD_FILES=(
  "src/pages/Dashboard/AdminDashboardContent.tsx"
  "src/pages/Dashboard/CashierDashboardContent.tsx"
  "src/pages/Dashboard/CeoDashboardContent.tsx"
  "src/pages/Dashboard/ManagerDashboardContent.tsx"
  "src/pages/Dashboard/SupplierDashboardContent.tsx"
)

for file in "${DASHBOARD_FILES[@]}"; do
  echo "Processing $file..."
  # Remove first generic string in .from<"Table", Type>
  sed -i -E 's/\.from<"[^"]+", ([^>]+)>/.from<\1>/' "$file"
done

# -------------------------------
# 5️⃣ Confirm
# -------------------------------
echo "All automated fixes applied! ✅"
echo "Next, run: npx tsc --noEmit to check for remaining TypeScript errors."

#!/bin/bash

# -------------------------------
# Ensure tsconfig.json is set for JSX
# -------------------------------
echo "Setting tsconfig.json JSX option..."
jq '.compilerOptions.jsx="react-jsx"' tsconfig.json > tsconfig.tmp.json && mv tsconfig.tmp.json tsconfig.json

# -------------------------------
# Fix AuthContext exports
# -------------------------------
echo "Fixing AuthContext exports..."
sed -i 's/export export const/AuthContext/export const/' src/context/AuthContext.tsx
sed -i 's/const AuthContext = createContext/export const AuthContext = createContext/' src/context/AuthContext.tsx

# -------------------------------
# Remove duplicate Database exports
# -------------------------------
echo "Removing duplicate Database exports..."
sed -i 's/export { Database };[[:space:]]*export { Database };/export { Database };/' src/supabase.ts

# -------------------------------
# Fix Supabase .from() generics
# -------------------------------
DASHBOARD_FILES=(
  "src/pages/Dashboard/AdminDashboardContent.tsx"
  "src/pages/Dashboard/CashierDashboardContent.tsx"
  "src/pages/Dashboard/CeoDashboardContent.tsx"
  "src/pages/Dashboard/ManagerDashboardContent.tsx"
  "src/pages/Dashboard/SupplierDashboardContent.tsx"
)

for file in "${DASHBOARD_FILES[@]}"; do
  echo "Processing $file..."
  sed -i -E 's/\.from<"[^"]+", ([^>]+)>/.from<\1>/' "$file"
done

# -------------------------------
# Confirm fixes
# -------------------------------
echo "All JSX and Supabase fixes applied! ✅"
npx tsc --noEmit
