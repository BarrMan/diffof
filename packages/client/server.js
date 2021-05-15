const express = require('express');
const path = require('path');
const { clientPort } = require('@barrman/diffof-common');

const serveClient = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.use(express.static(path.resolve(__dirname, 'build')));

  app.listen(clientPort);

  console.log('Client app started at port', clientPort);
};

module.exports = { serveClient };
