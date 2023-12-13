module.exports = {
  // '*.{ts}': 'npm run lint:fix',
  '*.md': 'markdownlint',
  '*.json': 'npx jsonlint',
  '*.yml': 'yamllint',
  'COMMIT_EDITMSG': 'npx commitlint --edit',
};