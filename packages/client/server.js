const express = require('express');
const path = require('path');
const { clientPort } = require('@barrman/diffof-common');

const serveClient = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const serveStaticFilesPath = path.resolve(__dirname, 'build');

  console.log('serving static client files', serveStaticFilesPath);

  app.use(express.static(serveStaticFilesPath));

  app.listen(clientPort);

  console.log('Client app started at port', clientPort);
};

module.exports = { serveClient };
