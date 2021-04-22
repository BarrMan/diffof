import { DiffKind } from "./DiffKind";
import IDiffPhrase from "./IDiffPhrase";
import { PhraseSymbol } from "./PhraseSymbol";

export class SymbolPhrase implements IDiffPhrase<PhraseSymbol> {
    public isSymbol = true;

    constructor(public phrase: number, public diffKind?: DiffKind) { }
}