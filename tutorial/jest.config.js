module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
    '^~~/(.+)': '<rootDir>/auto/$1',
    '^@@/(.+)': '<rootDir>/testData/$1',
    '\\.css$': '<rootDir>/node_modules/jest-css-modules',
  },
  // testing-library/jest-domのglobalな有効化
  // 参考：https://www.npmjs.com/package/@testing-library/jest-dom
  setupFilesAfterEnv: ['./rtl.setup.ts'],
}
