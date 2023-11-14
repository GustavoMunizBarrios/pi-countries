/* const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const DB_upload = require('./DB_upload')
const port = process.env.PORT || 3001;


//Cuando force esta en false se mantiene la persistencia de datos, incluso cuando se cierre el servidor.
//Cuando esta en true los datos se borran si el servidor se cierra.
conn
  .sync({ force: false })
  .then(async() => {
      await DB_upload();
      server.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${port}`);
      })
}).catch(error => console.error(error))

module.exports = server; */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = require("./src/server");
const { conn } = require('./src/db.js');
const DB_upload = require('./DB_upload')
const port = process.env.PORT || 3001;

// Create a new Express application for your proxy server
const app = express();

// Set up middleware to forward requests
app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: 'http://localhost:' + port, changeOrigin: true }));

// Start your application's server
conn
  .sync({ force: false })
  .then(async() => {
      await DB_upload();
      server.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${port}`);
      })
}).catch(error => console.error(error))

// Start the proxy server
const proxyPort = process.env.PROXY_PORT || 3000;
app.listen(proxyPort, () => {
  console.log(`Proxy server listening on port ${proxyPort}`);
});

module.exports = server;

