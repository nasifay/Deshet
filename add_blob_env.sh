#!/bin/bash
# Helper script to add BLOB_READ_WRITE_TOKEN to all environments
# Usage: ./add_blob_env.sh <your_token_here>

if [ -z "$1" ]; then
    echo "Usage: $0 <BLOB_READ_WRITE_TOKEN>"
    echo ""
    echo "Get your token from: https://vercel.com/dashboard/stores"
    exit 1
fi

TOKEN="$1"
echo "Adding BLOB_READ_WRITE_TOKEN to all environments..."

echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN production --yes 2>/dev/null || echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN production
echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN preview --yes 2>/dev/null || echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN preview  
echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN development --yes 2>/dev/null || echo "$TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN development

echo "Done! Verify with: vercel env ls"
