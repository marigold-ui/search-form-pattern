const path = require('node:path');
const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  collectCoverageFrom: ['!**/.parcel-cache/**', '!**/dist/**'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
});
