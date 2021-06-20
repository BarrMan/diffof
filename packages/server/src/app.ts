/* eslint-disable no-restricted-globals */
import express, { Request, Response } from "express";
import cors from "cors";
import { resetParagraphIds } from "./classes/DiffParagraphBuilder";
import { GraphBuilder } from "./classes/GraphBuilder";
import { DocumentDiffOptions } from "./interfaces/DocumentDiffOptions";
import DiffStrategyFactory from "./factories/DiffStrategyFactory";

export const initApp = (
  port: number,
  prevSource: string,
  nextSource: string,
  diffOptions: any
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

    try {
      console.log("calculating diffs with options:", diffOptions);

      const diffResult = await DiffStrategyFactory.getInstance().evaluateDiffs(
        diffOptions,
        prevSource,
        nextSource
      );

      console.log("done calculating diffs...");

      const data = {
        documentDiffs: diffResult.diffs,
        totalDocuments: diffResult.diffPairs.length,
      };
      await GraphBuilder.commit();

      res.json(data);
    } catch (e) {
      console.error(e);
    }
  });

  app.listen(port);

  console.log("app listening on port", port);
};
