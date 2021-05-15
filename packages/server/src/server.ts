import path from "path";
import { serverPort } from "@barrman/diffof-common";
import { initApp } from "./app";

initApp(
  serverPort,
  path.resolve("../dump_old/prev/dummy.json"),
  path.resolve("../dump_old/prev/dummy.json")
);
