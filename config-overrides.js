const { override, addLessLoader } = require('customize-cra')
// paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
// config.output.path = path.join(path.dirname(config.output.path), 'dist');

const path = require('path')
const paths = require('react-scripts/config/paths')
paths.appBuild = path.join(path.dirname(paths.appBuild), 'doc')

module.exports = override()





