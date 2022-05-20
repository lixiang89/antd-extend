const { 
    override, 
    fixBabelImports,
    setWebpackPublicPath,
    addBabelPlugins,
    disableEsLint 
} = require('customize-cra')

const path = require('path')
const paths = require('react-scripts/config/paths')
paths.appBuild = path.join(path.dirname(paths.appBuild), 'docs')

module.exports = override(
    disableEsLint(),
    setWebpackPublicPath(process.env.NODE_ENV==='development'?'/':'/antd-extend'),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css' // `style: true` 会加载 less 文件
    }),
)





