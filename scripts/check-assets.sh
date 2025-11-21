#!/bin/bash
# Asset checker - Verifies all asset references exist
echo "Checking for broken image references..."
grep -r 'src="/assets' public/ src/ 2>/dev/null | while read line; do
  path=$(echo $line | sed 's/.*src="\([^"]*\)".*/\1/')
  [ -f "public$path" ] || echo "✗ Missing: $path"
done
echo "✓ Asset check complete"
