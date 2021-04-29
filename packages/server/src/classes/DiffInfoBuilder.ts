import { IDiffPhrase } from "@barrman/diffof-common";
import { IParagraph } from "src/interfaces/IParagraph";
import { TContent } from "src/interfaces/TContent";
import DiffKind from "../interfaces/DiffKind";
import IDiffInfo from "../interfaces/IDiffInfo";
import { IDiffLine } from "../interfaces/IDiffLine";
import DiffLineBuilder from "./DiffLineBuilder";
import { DiffParagraphBuilder } from "./DiffParagraphBuilder";

export default class DiffInfoBuilder implements IDiffInfo {
  public paragraphs: IParagraph[] = [];
  public stackPreviousLine: DiffLineBuilder = new DiffLineBuilder();
  public currentParagraph: IParagraph = new DiffParagraphBuilder(0, this);

  constructor() {
    this.paragraphs.push(this.currentParagraph);
  }

  public addLine(): DiffLineBuilder;
  public addLine(diffKind?: DiffKind): DiffLineBuilder;

  public addLine(diffKind?: DiffKind): DiffLineBuilder {
    if (!this.currentParagraph) this.addParagraph(new DiffParagraphBuilder());

    const diffLine = this.currentParagraph.addLine(diffKind);

    return diffLine;
  }

  public addPhrase(phrase: IDiffPhrase): IDiffLine {
    return this.stackPreviousLine.addPhrase(phrase);
  }

  public addParagraph(paragraph: IParagraph): IParagraph {
    this.paragraphs.push(paragraph);

    this.currentParagraph = paragraph;

    return paragraph;
  }

  public closeParagraph(): IParagraph {
    if (!this.currentParagraph) throw new Error("No opened paragraph");

    this.currentParagraph.closeParagraph();

    if (!this.currentParagraph) throw new Error("Paragraph has no parent");

    return this.currentParagraph;
  }

  public concat(diffInfo: DiffInfoBuilder): void {
    if (diffInfo.stackPreviousLine.diffPhrases) {
      this.currentParagraph.addPhrases(diffInfo.stackPreviousLine.diffPhrases);
    } else {
      diffInfo.paragraphs.forEach((paragraph) => {
        this.currentParagraph.addParagraph(paragraph);
      });
    }
  }
}
