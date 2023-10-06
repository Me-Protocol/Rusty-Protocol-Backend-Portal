module.exports = {
  // '*.{ts}': 'npm run lint:fix',
  'package.json': 'npx fixpack', // Sort package.json
  '*.md': 'markdownlint',
  '*.json': 'npx jsonlint',
  '*.yml': 'yamllint',
  'COMMIT_EDITMSG': 'npx commitlint --edit',
};