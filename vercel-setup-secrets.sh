#!/bin/bash

# Set your Supabase info here
SUPABASE_URL="https://rvtievlyzwyogfzvixxv.supabase.co"
SUPABASE_ANON_KEY="YOUR-ANON-KEY"

# 1️⃣ Remove old lowercase environment variables if they exist
for ENV in production preview development; do
  echo "Removing old lowercase environment variables for $ENV..."
  vercel env rm vite_supabase_url $ENV --yes || true
  vercel env rm vite_supabase_anon_key $ENV --yes || true
done

# 2️⃣ Remove old lowercase secrets if they exist
echo "Removing old lowercase secrets..."
vercel secrets rm vite_supabase_url --yes || true
vercel secrets rm vite_supabase_anon_key --yes || true

# 3️⃣ Add new uppercase secrets
echo "Adding new uppercase secrets..."
vercel secrets add VITE_SUPABASE_URL "https://rvtievlyzwyogfzvixxv.supabase.co"
vercel secrets add VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2dGlldmx5end5b2dmenZpeHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMDUwNTMsImV4cCI6MjA3Mjc4MTA1M30.YJEitBlUKc5acIKmllu1sAII-Npod3FFN3c13irnhCs"

# 4️⃣ Link the new secrets to all environments
for ENV in production preview development; do
  echo "Linking secrets to $ENV..."
  vercel env add VITE_SUPABASE_URL $ENV VITE_SUPABASE_URL
  vercel env add VITE_SUPABASE_ANON_KEY $ENV VITE_SUPABASE_ANON_KEY
done

# 5️⃣ List environment variables for verification
echo "Final environment variables:"
vercel env ls
