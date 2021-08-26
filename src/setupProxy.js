const { createProxyMiddleware } = require('http-proxy-middleware');

if(process.env.NODE_ENV !== "production") {
  module.exports = function(app) {
    app.use(
      '/athletes',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  
    app.use(
      '/rules',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  };
}