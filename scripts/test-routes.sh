#!/bin/bash
# Route testing script - Tests all routes for basic availability
echo "Starting dev server..."
npm run dev &>/dev/null &
PID=$!
sleep 5

echo "Testing routes..."
ROUTES=("/" "/about" "/archive" "/contact" "/projects" "/projects/Grove")
for route in "${ROUTES[@]}"; do
  curl -s "http://localhost:3000$route" | grep -q "root" && echo "✓ $route" || echo "✗ $route FAILED"
done

kill $PID
