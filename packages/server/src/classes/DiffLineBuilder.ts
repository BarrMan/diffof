import DiffKind from "../interfaces/DiffKind";
import { IDiffLine } from "../interfaces/IDiffLine";
import { IDiffPhrase, StringPhrase, PhraseSymbolCharacters, SymbolPhrase } from "@barrman/diffof-common";
import { GraphBuilder } from "./GraphBuilder";

export default class DiffLineBuilder implements IDiffLine {
    public indent = 0;
    
    public graphId = `Line-${Math.ceil(Math.random()*100).toString()}`

    constructor(public diffKind?: DiffKind, public diffPhrases: IDiffPhrase[] = []) {
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
        const _phrase = typeof phrase === 'string' ? new StringPhrase(phrase) : phrase;

        this.diffPhrases.push(_phrase);

        GraphBuilder.addV(_phrase.graphId, { phrase: _phrase.phrase.toString() });

        GraphBuilder.addE(`${this.graphId}-${_phrase.graphId}`, this.graphId, _phrase.graphId);

        return this;
    }

    addPhrases(phrases: IDiffPhrase[]): DiffLineBuilder {
        phrases.forEach(phrase => this.addPhrase(phrase));

        return this;
    }
}