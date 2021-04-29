import DiffKind from "../interfaces/DiffKind";
import { IDiffLine } from "../interfaces/IDiffLine";
import { IDiffPhrase, StringPhrase, PhraseSymbolCharacters, SymbolPhrase } from "@barrman/diffof-common";

export default class DiffLineBuilder implements IDiffLine {
    public indent = 0;

    constructor(public diffKind?: DiffKind, public diffPhrases: IDiffPhrase[] = []) {
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
        const _phrase = typeof phrase === 'string' ? new StringPhrase(phrase) : phrase;

        this.diffPhrases.push(_phrase);

        return this;
    }

    addPhrases(phrases: IDiffPhrase[]): DiffLineBuilder {
        phrases.forEach(phrase => this.addPhrase(phrase));

        return this;
    }
}