#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { initApp } = require('@barrman/diffof-server/dist/app');
const { serverPort: defaultServerPort, clientPort: defaultClientPort } = require("@barrman/diffof-common");
const { serveClient } = require('@barrman/diffof-client/server');

const argv = yargs(hideBin(process.argv))
 .usage("Usage: diffof [options] [prevFilePath] [nextFilePath]")
 .option("cp", { alias: "client-port", describe: `Client's port (default: ${defaultClientPort}`, type: "number" })
 .option("sp", { alias: "server-port", describe: `Servers's port (default: ${defaultServerPort})`, type: "number" })
 .demandCommand(2)
 .argv;

const [prev, next] = argv._;
const clientPort = argv.cp || defaultClientPort;

initApp(argv.sp || defaultServerPort, path.resolve(prev), path.resolve(next));

serveClient(clientPort);

console.log(`Available in http://localhost:${clientPort}`);