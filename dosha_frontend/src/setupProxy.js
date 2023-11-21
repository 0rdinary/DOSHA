const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/auth', '/api'],
    createProxyMiddleware({
      target: 'http://52.78.107.61:8080',
      changeOrigin: true,
    }),
  );
};
