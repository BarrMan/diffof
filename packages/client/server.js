const express = require('express');
const path = require('path');

const serveClient = (port) => {
  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const serveStaticFilesPath = path.resolve(__dirname, 'build');

  app.use(express.static(serveStaticFilesPath));

  app.listen(port);

  console.log('Client app started at port', port);
};

module.exports = { serveClient };
