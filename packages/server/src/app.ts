/* eslint-disable no-restricted-globals */
import express, { Request, Response } from "express";
import cors from "cors";
import { serverPort } from "@barrman/diffof-common";
import DocumentDiffStrategy from "./diffStrategies/DocumentDiffStrategy";
import { resetParagraphIds } from "./classes/DiffParagraphBuilder";
import { GraphBuilder } from "./classes/GraphBuilder";

export const initApp = (prevSource: string, nextSource: string): void => {
  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());

  if (process.env.GRAPH_ENABLED === "true") {
    console.log("Graph debugging enabled");
    GraphBuilder.enable();
  }

  app.get("/diff", async (req: Request, res: Response) => {
    resetParagraphIds();

    await GraphBuilder.clearGraph();

    const { fromIndex = 0, toIndex = 100 } = req.query;

    const fromIndexInt = parseInt(fromIndex as string);
    if (isNaN(fromIndexInt)) {
      throw new Error("fromIndex should be an integer");
    }

    const toIndexInt = parseInt(toIndex as string);
    if (isNaN(toIndexInt)) {
      throw new Error("toIndex should be an integer");
    }

    if (toIndexInt < fromIndexInt) {
      throw new Error(`toIndex can't be less than fromIndex`);
    }

    console.log("calculating diffs...");
    const documentsDiffStrategy = new DocumentDiffStrategy({
      uniqueKey: "id",
      arraysByIndexOnly: false,
    });

    const prev = await (await import(prevSource)).default;
    const next = await (await import(nextSource)).default;

    const diffPairs = documentsDiffStrategy.getDiffPairs(prev, next);
    const diffRes = documentsDiffStrategy.getDiffs(diffPairs);

    await GraphBuilder.commit();
    // const diffRes = getDiffs(fromIndexInt, toIndexInt);
    console.log("done calculating diffs...", diffRes);

    const data = {
      documentDiffs: diffRes,
      totalDocuments: 2,
    };

    res.json(data);
  });

  app.listen(serverPort);

  console.log("app listening on port", serverPort);
};
