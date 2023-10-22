module.exports = {
    coverageReporters: ['html'],
    reporters: ['default', 'jest-html-reporters'],
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/path/to/ignore/**'],
};
