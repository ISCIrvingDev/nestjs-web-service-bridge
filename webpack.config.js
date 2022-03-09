/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');

/**
 * @param {Object} options The default webpack configuration
 * @param {Object} webpack The reference to the underlying webpack package used by the Nest CLI
 * @returns {Object} The webpack configuration
 */
module.exports = function (options /*, webpack*/) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    resolve: {
      alias: {
        '@app': joinSrc('application'),
        '@mod': joinSrc('modules'),
      },
    },
  };
};
