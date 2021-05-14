import { keyBy } from "lodash";
import {
  StringPhrase,
  SymbolPhrase,
  PhraseSymbolCharacters,
} from "@barrman/diffof-common";
import DiffInfoBuilder from "../classes/DiffInfoBuilder";
import DiffKind from "../interfaces/DiffKind";

import IDiffInfo from "../interfaces/IDiffInfo";
import IDiffState from "../interfaces/IDiffState";
import DiffStrategy from "./DiffStrategy";
import { isPrimitiveType } from "../classes/isPrimitiveType";
import { DocumentDiffOptions } from "../interfaces/DocumentDiffOptions";
import { KeyVal } from "../classes/KeyVal";
import { DiffParagraphBuilder } from "../classes/DiffParagraphBuilder";
import { IParagraph } from "src/interfaces/IParagraph";
import { IDiffLine } from "src/interfaces/IDiffLine";

type DocumentType = Record<string, unknown>;
export default class DocumentDiffStrategy
  implements DiffStrategy<DocumentType, IDiffInfo, DocumentDiffOptions> {
  getDiffPairs = (
    prevCollection: DocumentType[],
    nextCollection: DocumentType[],
    diffOptions: DocumentDiffOptions
  ): IDiffState<DocumentType>[] => {
    const [prevHashes, nextHashes] = [
      keyBy(prevCollection, diffOptions.uniqueKey),
      keyBy(nextCollection, diffOptions.uniqueKey),
    ];

    return Object.entries(prevHashes)
      .map(([key, value]) => ({
        prev: value,
        next: nextHashes[key],
      }))
      .concat(
        Object.entries(nextHashes)
          .filter(([key]) => !prevHashes[key])
          .map(([, val]) => ({
            prev: undefined,
            next: val,
          }))
      );
  };

  private cleanParagraphCircularDependencies(paragraph: IParagraph) {
    delete paragraph.parent;
    delete paragraph.currentLine;
    paragraph.content.forEach((content: IParagraph | IDiffLine) => {
      if (content instanceof DiffParagraphBuilder) {
        delete content.parent;

        this.cleanParagraphCircularDependencies(content);
      }
    });
  }

  private cleanCircularDependencies(diffInfos: IDiffInfo[]) {
    diffInfos.forEach((diffInfo) => {
      diffInfo.paragraphs.forEach((paragraph) =>
        this.cleanParagraphCircularDependencies(paragraph)
      );
      delete diffInfo.currentParagraph;
      delete diffInfo.stackPreviousLine;
    });

    return diffInfos;
  }

  getDiffs = (diffStates: IDiffState<DocumentType>[]): IDiffInfo[] => {
    const diffs = diffStates.map((diffState) => {
      return this.evaluateDocumentDiffs(diffState);
    });

    return this.cleanCircularDependencies(diffs);
  };

  private render(
    diffKind: DiffKind | (() => DiffKind),
    obj: unknown
  ): DiffInfoBuilder {
    const diffInfo = new DiffInfoBuilder();

    const getDiffKind =
      typeof diffKind === "function" ? diffKind : () => diffKind;

      if (!obj) {
        return diffInfo;
      }
      else if (obj instanceof KeyVal) {
        diffInfo.addLine();
        diffInfo.currentParagraph.addPhrase(`${obj.key}: `);
        diffInfo.concat(this.render(diffKind, obj.val));
      } else if (Array.isArray(obj)) {
      diffInfo
        .addLine(getDiffKind())
        .addPhrase(new StringPhrase("["));
      diffInfo.addParagraph(new DiffParagraphBuilder(1));
      obj.forEach((item) => {
          diffInfo.addLine(getDiffKind());
          diffInfo.currentParagraph.addPhrase(new StringPhrase(`${item},`))
      });
      diffInfo.closeParagraph();
      diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase("]"));
    } else if (typeof obj === "object") {
      diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase("{"));
      Object.entries(obj).forEach(([key, val]) => {
        const line = diffInfo
          .addLine(getDiffKind())
          .addPhrase(new StringPhrase(`${key}:`));
        if (isPrimitiveType(val)) {
          line.addPhrases([
            new SymbolPhrase(PhraseSymbolCharacters.SPACE),
            new StringPhrase(val),
            new StringPhrase(","),
          ]);
        } else {
          diffInfo.concat(this.render(diffKind, val));
        }
      });
      diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase("}"));
    } else {
      diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase(obj));
    }

    return diffInfo;
  }

  private evalulatePropertyDiffs(
    prev: unknown,
    next: unknown
  ): DiffInfoBuilder {
    const diffInfo = new DiffInfoBuilder();

    if (
      typeof prev !== typeof next ||
      Array.isArray(prev) !== Array.isArray(next)
    ) {
      // unmatches types
      console.log("unmatched type");
      diffInfo.concat(this.render(DiffKind.REMOVED, prev));
      diffInfo.concat(this.render(DiffKind.ADDED, next));
    } else {
      // same type
      if (Array.isArray(prev)) {
        diffInfo.addLine().addPhrase("[");
        diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));
        prev.forEach((prevItem) => {
          // TODO: Add complex array types
          if ((next as any[]).indexOf(prevItem) === -1) {
            diffInfo.addLine(DiffKind.REMOVED).addPhrase(new StringPhrase(prevItem)).addPhrase(',');
          } else {
            diffInfo.addLine().addPhrase(new StringPhrase(prevItem)).addPhrase(',');
          }
        });
        (next as any[]).forEach((nextItem) => {
          if (prev.indexOf(nextItem) === -1) {
            diffInfo.addLine(DiffKind.ADDED).addPhrase(new StringPhrase(nextItem)).addPhrase(',');
          }
        });
        diffInfo.closeParagraph();
        diffInfo.addLine().addPhrase("]");
      } else if (prev instanceof KeyVal && next instanceof KeyVal) {
        diffInfo.addLine().addPhrase(`${prev.key}: `);
        diffInfo.concat(this.evalulatePropertyDiffs(prev.val, next.val));
        diffInfo.addPhrase(",");
      } else if (typeof prev === "object") {
        diffInfo.addLine().addPhrase("{");
        diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));
        console.log('Opened paragraph');
        diffInfo.currentParagraph.debug();
        Object.entries(prev).forEach(([prevKey, prevVal]) => {
          if (!next[prevKey]) {
            diffInfo.concat(
              this.render(DiffKind.REMOVED, new KeyVal(prevKey, prevVal))
            );
          } else {
            diffInfo.addLine().addPhrase(`${prevKey}: `);
            const nestedDiffs = this.evalulatePropertyDiffs(
              prevVal,
              next[prevKey]
            );
            diffInfo.concat(nestedDiffs);
          }
        });
        // TODO: loop through all entries of next
        const currentParagraph = diffInfo.closeParagraph();
        diffInfo.addLine().addPhrase("}");
        currentParagraph.debug();
      } else {
        if (prev !== next) {
          diffInfo.addPhrase(new StringPhrase(prev, DiffKind.REMOVED));
          diffInfo.addPhrase(new StringPhrase(next, DiffKind.ADDED));
        } else {
          diffInfo.addPhrase(new StringPhrase(prev));
        }
        diffInfo.addPhrase(",");
      }
    }

    console.log('done evaluting');
    diffInfo.currentParagraph.debug();

    return diffInfo;
  }

  private getNestedDiffInfoWithConcat() { // TODO: Move to tests
    const diffInfo = new DiffInfoBuilder();

    diffInfo.addLine();
    diffInfo.currentParagraph.addPhrase('{');
    diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('hello: ');
    diffInfo.currentParagraph.addPhrase('{');
    diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));

    const nestedDiffInfo = new DiffInfoBuilder();

    nestedDiffInfo.currentParagraph.addLine();
    nestedDiffInfo.currentParagraph.addPhrase('key: value');
    diffInfo.concat(nestedDiffInfo);

    diffInfo.currentParagraph.closeParagraph();
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('}');
    diffInfo.currentParagraph.closeParagraph();
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('}');

    return diffInfo;
  }

  private getNestedDiffInfoWithoutConcat() { // TODO: Move to tests
    const diffInfo = new DiffInfoBuilder();
    diffInfo.addLine();
    diffInfo.currentParagraph.addPhrase('{');
    diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('hello: ');
    diffInfo.currentParagraph.addPhrase('{');
    diffInfo.currentParagraph.addParagraph(new DiffParagraphBuilder(1));
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('key: value');
    diffInfo.currentParagraph.closeParagraph();
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('}');
    diffInfo.currentParagraph.closeParagraph();
    diffInfo.currentParagraph.addLine();
    diffInfo.currentParagraph.addPhrase('}');

    return diffInfo;
  }

  private evaluateDocumentDiffs = (
    diffState: IDiffState<DocumentType>
  ): IDiffInfo => {
    const diffInfo = this.evalulatePropertyDiffs(diffState.prev, diffState.next);
    // const diffInfo = this.getNestedDiffInfoWithConcat();
    // diffInfo.currentParagraph.debug();
    return diffInfo;
  };

  fileMask = "json";
}
