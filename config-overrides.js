const { override, fixBabelImports,addLessLoader,addDecoratorsLegacy } = require('customize-cra');
const themes = require('./theme')
module.exports = override(
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory: 'es',
        style:true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: themes
    }),
    addDecoratorsLegacy()
)