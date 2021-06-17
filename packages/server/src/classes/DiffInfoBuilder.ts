import { isNumber } from "lodash";
import { IDiffPhrase } from "@barrman/diffof-common";
import { IParagraph } from "src/interfaces/IParagraph";
import DiffKind from "../interfaces/DiffKind";
import IDiffInfo from "../interfaces/IDiffInfo";
import DiffLineBuilder from "./DiffLineBuilder";
import { DiffParagraphBuilder } from "./DiffParagraphBuilder";
import { GraphBuilder } from "./GraphBuilder";

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
    if (!this.currentParagraph)
      this.addParagraph(new DiffParagraphBuilder(0, this));

    const diffLine = this.currentParagraph.addLine(diffKind);

    GraphBuilder.addE(
      `${this.graphId}-${diffLine.graphId}`,
      this.graphId,
      diffLine.graphId
    );

    return diffLine;
  }

  public addPhrase(phrase: IDiffPhrase): DiffLineBuilder {
    return this.stackPreviousLine.addPhrase(phrase);
  }

  public addPhrases(phrases: IDiffPhrase[]): void {
    phrases.forEach((phrase) => this.addPhrase(phrase));
  }

  public addParagraph(paragraph: IParagraph): IParagraph {
    this.paragraphs.push(paragraph);

    GraphBuilder.addE(
      `${this.graphId}-${paragraph.id.toString()}`,
      this.graphId,
      paragraph.graphId
    );

    this.currentParagraph = paragraph;

    return paragraph;
  }

  public closeParagraph(): IParagraph {
    if (!this.currentParagraph) throw new Error("No opened paragraph");

    this.currentParagraph.closeParagraph();

    if (!this.currentParagraph) throw new Error("Paragraph has no parent");

    return this.currentParagraph;
  }

  private allPhrasesAre(phrases: IDiffPhrase, diffKind: DiffKind) {
    return phrases.every((phrase) => phrase.diffKind === diffKind);
  }

  public concat(diffInfo: DiffInfoBuilder): DiffKind {
    const stackedPhrases = diffInfo.stackPreviousLine.diffPhrases;
    let stackedDiffKind = DiffKind.NONE;

    if (stackedPhrases.length) {
      if (this.currentParagraph.currentLine) {
        this.currentParagraph.currentLine.addPhrases(stackedPhrases);

        if (this.allPhrasesAre(stackedPhrases, DiffKind.REMOVED)) {
          this.currentParagraph.currentLine.diffKind = DiffKind.REMOVED;
          stackedDiffKind = DiffKind.REMOVED;
        } else if (this.allPhrasesAre(stackedPhrases, DiffKind.ADDED)) {
          this.currentParagraph.currentLine.diffKind = DiffKind.ADDED;
          stackedDiffKind = DiffKind.ADDED;
        } else if (!this.allPhrasesAre(stackedPhrases, undefined)) {
          // duplicate line twice. Once REMOVED and once ADDED
          this.currentParagraph.currentLine.diffKind = DiffKind.REMOVED;
          const removedLine = this.currentParagraph.currentLine;

          const addedLine = this.currentParagraph.addLine(DiffKind.ADDED);
          removedLine.diffPhrases.forEach((phrase) => {
            addedLine.addPhrase(phrase);
          });

          removedLine.filterOutUnrelatedDiffKinds();
        }
      } else {
        this.addPhrases(stackedPhrases);
      }
    }

    diffInfo.paragraphs.forEach((paragraph) => {
      if (paragraph.content.length) {
        paragraph.debug();
        this.currentParagraph.addParagraph(paragraph);
        this.currentParagraph.closeParagraph();
      }
    });

    return stackedDiffKind;
  }
}
