import { override, addLessLoader, fixBabelImports, addBabelPlugin } from 'customize-cra';
import hotLoader from 'react-app-rewire-hot-loader';
import { theme } from './src/config/theme/themeVariables';

const supportMjs = () => webpackConfig => {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    loader: 'css-loader',
    options: {
      modules: true, // must add this
    },
    // type: 'javascript/auto',
  });
  return webpackConfig;
};

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...theme,
    },
  }),
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    modules: true,
    options: {
      modules: true, // must add this
    },
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?modules'],
  }),
  supportMjs(),
  (config, env) => {
    return hotLoader(config, env);
  },
);
