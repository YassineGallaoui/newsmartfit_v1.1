const { createProxyMiddleware } = require('http-proxy-middleware');

let s = "";

if(process.env.NODE_ENV !== "production") {
  s = 'http://newsmartfitv1.herokuapp.com:' + (process.env.PORT || 5000)
  module.exports = function(app) {
    app.use(
      '/athletes',
      createProxyMiddleware({
        target: s,
        changeOrigin: true,
      })
    );
  
    app.use(
      '/rules',
      createProxyMiddleware({
        target: s,
        changeOrigin: true,
      })
    );
  };
} else {
  s = 'http://newsmartfitv1.herokuapp.com:' + (process.env.PORT || 5000)
  module.exports = function(app) {
    app.use(
      '/athletes',
      createProxyMiddleware({
        target: s,
        changeOrigin: true,
      })
    );
  
    app.use(
      '/rules',
      createProxyMiddleware({
        target: s,
        changeOrigin: true,
      })
    );
  };
}