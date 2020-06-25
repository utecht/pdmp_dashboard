module.exports = function (config) {
  if (process.env.NODE_ENV === 'development') {
    config.devServer.proxy = [
      {
        // proxy requests matching a pattern:
        path: '/api',

        // where to proxy to:
        target: 'http://localhost:8000',

      }
    ];
  }
};
