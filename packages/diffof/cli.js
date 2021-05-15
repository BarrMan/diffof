#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { initApp } = require('@barrman/diffof-server/dist/app');
const { serveClient, port } = require('@barrman/diffof-client/server');

const [,, prev, next] = process.argv;

initApp(path.resolve(prev), path.resolve(next));

serveClient();

console.log(`Available in localhost:${port}`);