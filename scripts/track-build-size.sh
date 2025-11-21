#!/bin/bash
# Build size tracker - Reports current build and asset sizes
npm run build &>/dev/null
du -sh dist/ | awk '{print "Build size: " $1}'
du -sh public/assets/ 2>/dev/null | awk '{print "Asset size: " $1}' || echo "Asset size: N/A"
find src -name "*.jsx" -o -name "*.js" | xargs wc -l 2>/dev/null | tail -1 | awk '{print "LOC: " $1}'
