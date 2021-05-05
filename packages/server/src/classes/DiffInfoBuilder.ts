import { IDiffPhrase } from "@barrman/diffof-common";
import { IParagraph } from "src/interfaces/IParagraph";
import DiffKind from "../interfaces/DiffKind";
import IDiffInfo from "../interfaces/IDiffInfo";
import DiffLineBuilder from "./DiffLineBuilder";
import { DiffParagraphBuilder } from "./DiffParagraphBuilder";
import { GraphBuilder } from './GraphBuilder';

export default class DiffInfoBuilder implements IDiffInfo {
  public graphId = `DiffInfo-${Math.ceil(Math.random() * 100).toString()}`;
  public paragraphs: IParagraph[] = [];
  public stackPreviousLine: DiffLineBuilder = new DiffLineBuilder();
  public currentParagraph: IParagraph = new DiffParagraphBuilder(0, this);

  constructor() {
    GraphBuilder.addV(this.graphId);

    this.addParagraph(this.currentParagraph);
  }

  public addLine(): DiffLineBuilder;
  public addLine(diffKind?: DiffKind): DiffLineBuilder;

  public addLine(diffKind?: DiffKind): DiffLineBuilder {
    if (!this.currentParagraph) this.addParagraph(new DiffParagraphBuilder(0, this));

    const diffLine = this.currentParagraph.addLine(diffKind);

    GraphBuilder.addE(`${this.graphId}-${diffLine.graphId}`, this.graphId, diffLine.graphId);

    return diffLine;
  }

  public addPhrase(phrase: IDiffPhrase): DiffLineBuilder {
    return this.stackPreviousLine.addPhrase(phrase);
  }

  public addParagraph(paragraph: IParagraph): IParagraph {
    this.paragraphs.push(paragraph);

    GraphBuilder.addE(`${this.graphId}-${paragraph.id.toString()}`, this.graphId, paragraph.graphId);

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
    if (diffInfo.stackPreviousLine.diffPhrases.length) {
      this.currentParagraph.addPhrases(diffInfo.stackPreviousLine.diffPhrases);
    } else {
      diffInfo.paragraphs.forEach((paragraph) => {
        if (paragraph.content.length) {
          console.log('concating paragraphs');
          paragraph.debug();
          this.currentParagraph.addParagraph(paragraph);
        }
      });
    }
  }
}
