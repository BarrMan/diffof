import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { PhraseSymbolCharacters } from "../interfaces/PhraseSymbolCharacters";
import { GraphItem } from "./GraphItem";

export class SymbolPhrase implements IDiffPhrase<PhraseSymbolCharacters>, GraphItem {
    public isSymbol = true;
    
    graphId: string = `SymbolPhrase-${Math.ceil(Math.random()*100).toString()}`;

    constructor(public phrase: number, public diffKind?: DiffKind) { }

}