import path from "path";
import { serverPort } from "@barrman/diffof-common";
import { initApp } from "./app";

const fileName = "dummy";
const dirName = "../dump_old";
const uniqueKey = "id";

initApp(
  serverPort,
  path.resolve(__dirname, `${dirName}/prev/${fileName}.json`),
  path.resolve(__dirname, `${dirName}/next/${fileName}.json`),
  {
    arraysByIndexOnly: false,
    uniqueKey,
  }
);
