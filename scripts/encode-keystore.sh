#!/bin/bash

# Script to encode keystore file for GitHub Secrets
# Usage: ./scripts/encode-keystore.sh

KEYSTORE_PATH="android/app/keystore.jks"

if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "❌ Error: Keystore file not found at $KEYSTORE_PATH"
    exit 1
fi

echo "📦 Encoding keystore file..."
echo ""
echo "Copy the following base64 encoded string and add it as GitHub Secret 'KEYSTORE_BASE64':"
echo ""
echo "---"
base64 -i "$KEYSTORE_PATH"
echo "---"
echo ""
echo "✅ Done! Now add this to your GitHub repository secrets:"
echo "   1. Go to: Settings → Secrets and variables → Actions"
echo "   2. Add the following secrets:"
echo "      - KEYSTORE_BASE64: (paste the base64 string above)"
echo "      - KEYSTORE_KEY_ALIAS: key0"
echo "      - KEYSTORE_STORE_PASSWORD: 12345678"
echo "      - KEYSTORE_KEY_PASSWORD: 12345678"
echo ""
echo "⚠️  Note: Update KEYSTORE_KEY_ALIAS, KEYSTORE_STORE_PASSWORD, and KEYSTORE_KEY_PASSWORD"
echo "   with your actual keystore values if they differ from the defaults above."
