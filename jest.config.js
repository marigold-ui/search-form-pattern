const path = require('node:path');
const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  collectCoverageFrom: ['!**/.parcel-cache/**', '!**/dist/**'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
  },
});
