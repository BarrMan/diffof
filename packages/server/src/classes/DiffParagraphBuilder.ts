import { IDiffPhrase } from "@barrman/diffof-common";
import IDiffInfo from "src/interfaces/IDiffInfo";
import { TContent } from "src/interfaces/TContent";
import DiffKind from "../interfaces/DiffKind";
import { IParagraph } from "../interfaces/IParagraph";
import DiffInfoBuilder from "./DiffInfoBuilder";
import DiffLineBuilder from "./DiffLineBuilder";

let currentParagraphId = 1;

export class DiffParagraphBuilder implements IParagraph {
  id: number = ++currentParagraphId;

  public isParagraph = true;

  public parent: IParagraph | IDiffInfo;

  public currentLine: DiffLineBuilder;

  constructor(public indent = 0, parent?: IParagraph | IDiffInfo) {
    this.parent = parent;
  }

  content: TContent[] = [];

  addLine(diffKind?: DiffKind): DiffLineBuilder {
    this.currentLine = new DiffLineBuilder(diffKind);

    this.content.push(this.currentLine);

    return this.currentLine;
  }

  addPhrase(phrase: IDiffPhrase): DiffLineBuilder {
    if (!this.currentLine) {
      this.addLine();
    }

    this.currentLine.addPhrase(phrase);

    return this.currentLine;
  }

  addPhrases(phrases: IDiffPhrase[]): DiffLineBuilder {
    phrases.forEach((phrase) => this.addPhrase(phrase));

    return this.currentLine;
  }

  addParagraph(paragraph: IParagraph): IParagraph {
    paragraph.parent = this;

    this.content.push(paragraph);

    this.setCurrentParagraph(paragraph);

    return paragraph;
  }

  closeParagraph(): void {
    this.setCurrentParagraph(this.parent);
  }

  setCurrentParagraph(paragraph: IParagraph | IDiffInfo): void {
    let parent = this.parent;

    while (!(parent instanceof DiffInfoBuilder)) {
      parent = (parent as IParagraph).parent;
    }

    parent.currentParagraph = paragraph as IParagraph;
  }
}
