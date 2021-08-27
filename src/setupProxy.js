const { createProxyMiddleware } = require('http-proxy-middleware');

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== "production") {
  module.exports = function(app) {
    app.use(
      '/athletes',
      createProxyMiddleware({
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      })
    );
  
    app.use(
      '/rules',
      createProxyMiddleware({
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      })
    );
  };
}