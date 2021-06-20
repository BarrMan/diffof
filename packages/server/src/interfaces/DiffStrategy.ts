import DiffInfo from "./IDiffInfo";
import IDiffState from "./IDiffState";

export interface DiffStrategyConstructor {
  new (diffOptions: any): DiffStrategy<any, any, any>;
}

export default interface DiffStrategy<
  FileFormatType,
  DiffInfoExtension extends DiffInfo,
  DiffOptions
> {
  fileMask: RegExp;

  getDiffPairs: (
    prev: FileFormatType[],
    next: FileFormatType[],
    diffOptions: DiffOptions
  ) => IDiffState<FileFormatType>[];

  getDiffs: (diffStates: IDiffState<FileFormatType>[]) => DiffInfoExtension[];
}
