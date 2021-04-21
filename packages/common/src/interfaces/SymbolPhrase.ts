import { DiffKind } from "./DiffKind";
import IDiffPhrase from "./IDiffPhrase";
import { PhraseSymbol } from "./PhraseSymbol";

export default class SymbolPhrase implements IDiffPhrase<PhraseSymbol> {
    constructor(public phrase: PhraseSymbol, public diffKind?: DiffKind) { }
}