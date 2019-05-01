const express = require('express');
const proxy = require('http-proxy-middleware');

const { routes } = require('./config.json');

const app = express();

app.use(express.static('static'))

for (route of routes) {
  const proxyInstance = proxy({
    target: route.address,
    changeOrigin: true,
    pathRewrite: {
      [route.route]: '/'
    }
  })
  app.use(route.route, proxyInstance);
  app.use('/*.js', proxyInstance);
  app.use('/*.css', proxyInstance);
  app.use('/*.json', proxyInstance);
}

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`quo-server listening on port ${port}`);
});