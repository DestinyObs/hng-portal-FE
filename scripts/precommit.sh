pnpm lint-staged --verbose
if [ $? -eq 0 ]; then
  echo "\n✅ All linting & formatting passed!"
fi
