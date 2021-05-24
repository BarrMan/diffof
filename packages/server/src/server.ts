import path from "path";
import { serverPort } from "@barrman/diffof-common";
import { initApp } from "./app";

initApp(
  serverPort,
  path.resolve(__dirname, "../dump_old/prev/dummy.json"),
  path.resolve(__dirname, "../dump_old/next/dummy.json"),
  {
    arraysByIndexOnly: false,
    uniqueKey: "id",
  }
);
