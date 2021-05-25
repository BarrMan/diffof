/* eslint-disable no-restricted-globals */
import express, { Request, Response } from "express";
import cors from "cors";
import DocumentDiffStrategy from "./diffStrategies/DocumentDiffStrategy";
import { resetParagraphIds } from "./classes/DiffParagraphBuilder";
import { GraphBuilder } from "./classes/GraphBuilder";
import { DocumentDiffOptions } from "./interfaces/DocumentDiffOptions";

export const initApp = (
  port: number,
  prevSource: string,
  nextSource: string,
  diffOptions: DocumentDiffOptions // TODO: Make this more general to support different file types
): void => {
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

    console.log("calculating diffs with options:", diffOptions);
    const documentsDiffStrategy = new DocumentDiffStrategy(diffOptions);

    const prev = await (await import(prevSource)).default;
    const next = await (await import(nextSource)).default;

    const diffPairs = documentsDiffStrategy.getDiffPairs(prev, next);
    const diffRes = documentsDiffStrategy.getDiffs(diffPairs);

    await GraphBuilder.commit();
    console.log("done calculating diffs...", diffRes);

    const data = {
      documentDiffs: diffRes,
      totalDocuments: diffPairs.length,
    };

    res.json(data);
  });

  app.listen(port);

  console.log("app listening on port", port);
};
