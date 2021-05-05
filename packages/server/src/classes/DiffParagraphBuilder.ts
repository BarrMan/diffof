import { IDiffPhrase } from "@barrman/diffof-common";
import IDiffInfo from "src/interfaces/IDiffInfo";
import { TContent } from "src/interfaces/TContent";
import DiffKind from "../interfaces/DiffKind";
import { IParagraph } from "../interfaces/IParagraph";
import DiffInfoBuilder from "./DiffInfoBuilder";
import DiffLineBuilder from "./DiffLineBuilder";
import { GraphBuilder } from './GraphBuilder';

let currentParagraphId = 1;
export const resetParagraphIds = (): void => {
  currentParagraphId = 1;
};

export class DiffParagraphBuilder implements IParagraph {
  id: number = currentParagraphId++;

  graphId = `Paragraph-${this.id.toString()}`;

  public isParagraph = true;

  public parent: IParagraph | IDiffInfo;

  public currentLine: DiffLineBuilder;

  constructor(public indent = 0, parent?: IParagraph | IDiffInfo) {
    this.parent = parent;

    GraphBuilder.addV(this.graphId);
    
    if (this.parent) {
      GraphBuilder.addE(`${this.graphId}-${this.parent.graphId}`, this.graphId, this.parent.graphId)
    }
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

    GraphBuilder.addE(`${this.graphId}-${paragraph.graphId}`, this.graphId, paragraph.graphId);

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

  public debug(): void {
    let output = '';
    this.content.forEach(c => {
      if (c instanceof DiffParagraphBuilder) output += `p${c.id}`;
      else if(c instanceof DiffLineBuilder) output += c.diffPhrases.map(phr => phr.phrase).join('');
    });
    console.log(`paragraph debug [id=${this.id}]`,output);
  }
}
