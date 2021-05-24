#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initApp } = require("@barrman/diffof-server/dist/app");
const {
  serverPort: defaultServerPort,
  clientPort: defaultClientPort,
} = require("@barrman/diffof-common");
const { serveClient } = require("@barrman/diffof-client/server");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: diffof [options] [prevFilePath] [nextFilePath]")
  .option("cp", {
    alias: "client-port",
    describe: `Client's port`,
    type: "number",
    default: defaultClientPort
  })
  .option("sp", {
    alias: "server-port",
    describe: `Server's port`,
    type: "number",
    default: defaultServerPort
  })
  .option("uk", {
    alias: "unique-key",
    describe:
      'Unique identifier of each document in the collection for pairing between prev collection and next collection',
    type: "string",
    default: "id",
  })
  .option("arraysByIndexOnly", {
    describe:
      'Compares arrays by its indexes, order matters. If set to false, will try to compare by values. If values are complex types, will fallback to arraysByIndexOnly set to true',
    default: false,
  })
  .demandCommand(2).argv;

const [prev, next] = argv._;
const clientPort = argv.cp || defaultClientPort;

initApp(argv.sp || defaultServerPort, path.resolve(prev), path.resolve(next), argv);

serveClient(clientPort);

console.log(`Available in http://localhost:${clientPort}`);
