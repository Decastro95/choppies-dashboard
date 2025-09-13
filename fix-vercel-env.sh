#!/bin/bash

# ✅ Replace these with your actual Supabase values
SUPABASE_URL="https://rvtievlyzwyogfzvixxv.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2dGlldmx5end5b2dmenZpeHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMDUwNTMsImV4cCI6MjA3Mjc4MTA1M30.YJEitBlUKc5acIKmllu1sAII-Npod3FFN3c13irnhCs"

echo "🚨 Removing old lowercase secrets..."
vercel env rm vite_supabase_url -y 2>/dev/null
vercel env rm vite_supabase_anon_key -y 2>/dev/null

echo "✅ Adding VITE_SUPABASE_URL..."
for ENV in production preview development; do
  echo "$SUPABASE_URL" | vercel env add VITE_SUPABASE_URL $ENV
done

echo "✅ Adding VITE_SUPABASE_ANON_KEY..."
for ENV in production preview development; do
  echo "$SUPABASE_ANON_KEY" | vercel env add VITE_SUPABASE_ANON_KEY $ENV
done

echo "🎉 Done! Now redeploy with: vercel --prod"
