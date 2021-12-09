module.exports = {
  testEnvironment: 'node',
  globalSetup: './__tests__/config/setup.js',
  roots: ['./__tests__/lib/'],
  globalTeardown: './__tests__/config/teardown.js',
};
