import fs from 'fs';

import DiffInfo from "../interfaces/IDiffInfo";
import IDiffState from "../interfaces/IDiffState";

export default interface DiffStrategy<FileFormatType, DiffInfoExtension extends DiffInfo, DiffOptions> {
    fileMask: RegExp | string;

    getDiffPairs: (prev: FileFormatType[], next: FileFormatType[], diffOptions: DiffOptions) => IDiffState<FileFormatType>[];

    getDiffs: (diffStates: IDiffState<FileFormatType>[]) => [DiffInfoExtension, DiffInfoExtension][];
}