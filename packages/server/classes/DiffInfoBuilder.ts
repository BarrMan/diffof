import DiffKind from "../interfaces/DiffKind";
import IDiffInfo from "../interfaces/IDiffInfo";
import IDiffLine from "../interfaces/IDiffLine";
import DiffLineBuilder from "./DiffLineBuilder";

export default class BuildInfoBuilder implements IDiffInfo {
    constructor(public diffLines: IDiffLine[] = []) {}

    public addLine(): DiffLineBuilder;
    public addLine(diffKind?: DiffKind): DiffLineBuilder;

    public addLine(diffKind?: DiffKind): DiffLineBuilder {
        const diffLine = new DiffLineBuilder(diffKind);

        this.diffLines.push(diffLine);

        return diffLine;
    }
}