import { IDiffLine } from "./IDiffLine";
import { IParagraph } from "./IParagraph";

export default interface IDiffInfo {
    graphId: string;

    stackPreviousLine: IDiffLine;

    currentParagraph: IParagraph;

    paragraphs: IParagraph[];
}