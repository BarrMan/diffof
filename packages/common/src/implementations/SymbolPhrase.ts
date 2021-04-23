import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { PhraseSymbolCharacters } from "../interfaces/PhraseSymbolCharacters";

export class SymbolPhrase implements IDiffPhrase<PhraseSymbolCharacters> {
    public isSymbol = true;

    constructor(public phrase: number, public diffKind?: DiffKind) { }
}