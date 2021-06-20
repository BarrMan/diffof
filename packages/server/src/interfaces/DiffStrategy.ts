import DiffInfo from "./IDiffInfo";
import IDiffState from "./IDiffState";

export type DiffStrategyConstructor = new (diffOptions: any) => DiffStrategy<
  any,
  any,
  any
>;

export default interface DiffStrategy<
  TFileFormatType,
  TDiffInfoExtension extends DiffInfo,
  TDiffOptions
> {
  fileMask: RegExp;

  getDiffPairs: (
    prev: TFileFormatType[],
    next: TFileFormatType[],
    diffOptions: TDiffOptions
  ) => IDiffState<TFileFormatType>[];

  getDiffs: (diffStates: IDiffState<TFileFormatType>[]) => TDiffInfoExtension[];
}
