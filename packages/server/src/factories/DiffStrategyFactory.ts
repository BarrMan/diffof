import fs from "fs";
import path from "path";
import DiffStrategy, {
  DiffStrategyConstructor,
} from "../interfaces/DiffStrategy";
import IDiffState from "src/interfaces/IDiffState";

const JsExtensionFilter = (fileName) => path.extname(fileName) === ".js";

export interface DiffEvaluationResult {
  diffPairs: IDiffState<any>[];

  diffs: any[];
}

declare type AnyDiffStrategy = DiffStrategy<any, any, any>;

export default class DiffStrategyFactory {
  private static instance: DiffStrategyFactory;
  private allStrategies: AnyDiffStrategy[];

  private constructor() {}

  static getInstance() {
    if (!DiffStrategyFactory.instance) {
      DiffStrategyFactory.instance = new DiffStrategyFactory();
    }

    return DiffStrategyFactory.instance;
  }

  private loadModule = async (path) => (await import(path)).default;

  private async loadAllDiffStrategies(
    diffOptions: any
  ): Promise<AnyDiffStrategy[]> {
    if (this.allStrategies) return this.allStrategies;

    const strategiesPath = path.resolve(__dirname, "../diffStrategies");
    const diffStrategyFiles = fs
      .readdirSync(strategiesPath)
      .filter(JsExtensionFilter);

    const diffStrategies = await Promise.all(
      diffStrategyFiles.map(async (diffStrategyFile) => {
        const strategyClass = (await this.loadModule(
          path.join(strategiesPath, diffStrategyFile)
        )) as DiffStrategyConstructor;

        return new strategyClass(diffOptions);
      })
    );

    this.allStrategies = diffStrategies;

    return diffStrategies;
  }

  async evaluateDiffs(
    diffOptions: any,
    prevSource: string,
    nextSource: string
  ): Promise<DiffEvaluationResult> {
    const diffStrategies = await this.loadAllDiffStrategies(diffOptions);
    const prev = await (await import(prevSource)).default;
    const next = await (await import(nextSource)).default;

    for (let diffStrategy of diffStrategies) {
      if (
        diffStrategy.fileMask.test(prevSource) &&
        diffStrategy.fileMask.test(nextSource)
      ) {
        const diffPairs = diffStrategy.getDiffPairs(prev, next, diffOptions);
        const diffs = diffStrategy.getDiffs(diffPairs);

        return { diffPairs, diffs };
      }
    }

    throw new Error(
      `No diff strategy found for sources: ${prevSource} ${nextSource}`
    );
  }
}
