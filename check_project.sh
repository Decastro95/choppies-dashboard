#!/bin/bash

LOGFILE="project_diagnostics.log"
echo "🔹 Project diagnostics started at $(date)" > $LOGFILE
echo "Results will also be saved to $LOGFILE"
echo "-------------------------------------"

# 1️⃣ TypeScript type check
echo "🟢 Running TypeScript type check..."
npx tsc --noEmit 2>&1 | tee -a $LOGFILE
tsc_exit=${PIPESTATUS[0]}

if [ $tsc_exit -ne 0 ]; then
  echo "❌ TypeScript check failed." | tee -a $LOGFILE
else
  echo "✅ TypeScript check passed." | tee -a $LOGFILE
fi

# 2️⃣ ESLint check
echo "" | tee -a $LOGFILE
echo "🟢 Running ESLint..." | tee -a $LOGFILE
npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0 2>&1 | tee -a $LOGFILE
eslint_exit=${PIPESTATUS[0]}

if [ $eslint_exit -ne 0 ]; then
  echo "❌ ESLint found issues." | tee -a $LOGFILE
else
  echo "✅ ESLint check passed." | tee -a $LOGFILE
fi

# 3️⃣ Start Next.js dev server
echo "" | tee -a $LOGFILE
echo "🟢 Starting Next.js dev server..." | tee -a $LOGFILE
echo "Visit http://localhost:3000 and check your dashboards for runtime errors." | tee -a $LOGFILE
npm run dev | tee -a $LOGFILE
