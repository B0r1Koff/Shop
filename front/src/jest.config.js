module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
      },      
}; 