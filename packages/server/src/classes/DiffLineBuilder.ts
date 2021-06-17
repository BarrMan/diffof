import { isNumber } from 'lodash';
import DiffKind from "../interfaces/DiffKind";
import { IDiffLine } from "../interfaces/IDiffLine";
import {
  IDiffPhrase,
  StringPhrase,
  PhraseSymbolCharacters,
  SymbolPhrase,
} from "@barrman/diffof-common";
import { GraphBuilder } from "./GraphBuilder";

export default class DiffLineBuilder implements IDiffLine {
  public indent = 0;

  public graphId = `Line-${Math.ceil(Math.random() * 100).toString()}`;

  constructor(
    public diffKind?: DiffKind,
    public diffPhrases: IDiffPhrase[] = []
  ) {
    GraphBuilder.addV(this.graphId);
  }

  addIndent(): DiffLineBuilder {
    this.indent++;

    return this.addPhrase(new SymbolPhrase(PhraseSymbolCharacters.TAB));
  }

  removeIndent(): DiffLineBuilder {
    this.indent--;

    return this;
  }

  addPhrase(phrase: IDiffPhrase | string): DiffLineBuilder {
    const _phrase: IDiffPhrase =
      typeof phrase === "string" ? new StringPhrase(phrase) : phrase;

      if (isNumber(_phrase.diffKind) && isNumber(this.diffKind) && _phrase.diffKind !== this.diffKind) {
        return this;
      }

    this.diffPhrases.push(_phrase);

    GraphBuilder.addV(_phrase.graphId, { phrase: _phrase.phrase.toString() });

    GraphBuilder.addE(
      `${this.graphId}-${_phrase.graphId}`,
      this.graphId,
      _phrase.graphId
    );

    return this;
  }

  addPhrases(phrases: IDiffPhrase[]): DiffLineBuilder {
    phrases.forEach((phrase) => this.addPhrase(phrase));

    return this;
  }

  filterOutUnrelatedDiffKinds(): void {
    this.diffPhrases = this.diffPhrases.filter(diffPhrase => !isNumber(diffPhrase.diffKind) || diffPhrase.diffKind === this.diffKind);
  }
}
