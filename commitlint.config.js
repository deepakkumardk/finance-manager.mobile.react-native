module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['sms-module', 'ui', 'app']],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'never'],
  },
};
