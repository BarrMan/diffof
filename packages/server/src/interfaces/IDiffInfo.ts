import { IDiffLine } from "./IDiffLine";
import { IParagraph } from "./IParagraph";

export default interface IDiffInfo {
    stackPreviousLine: IDiffLine;

    currentParagraph: IParagraph;

    paragraphs: IParagraph[];
}