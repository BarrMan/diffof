const express = require('express');
const path = require('path');

const serveClient = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.use(express.static(path.resolve(__dirname, 'build')));

  const port = 3000;

  app.listen(port);

  console.log('Client app started at port', port);
};

module.exports = { serveClient };
