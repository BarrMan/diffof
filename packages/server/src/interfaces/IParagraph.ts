import { IDiffPhrase } from "@barrman/diffof-common";
import DiffLineBuilder from "../classes/DiffLineBuilder";
import DiffKind from "./DiffKind";
import IDiffInfo from "./IDiffInfo";
import { IDiffLine } from "./IDiffLine";
import { TContent } from "./TContent";

export interface IParagraph {
  id: number;

  currentLine: IDiffLine;

  indent: number;

  content: TContent[];

  parent: IParagraph | IDiffInfo;

  addLine(diffKind?: DiffKind): DiffLineBuilder;

  addPhrase(phrase: IDiffPhrase): DiffLineBuilder;

  addPhrases(phrases: IDiffPhrase[]): DiffLineBuilder;

  addParagraph(paragraph: IParagraph): IParagraph;

  closeParagraph(): void;
}
