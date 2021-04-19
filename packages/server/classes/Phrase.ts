import DiffKind from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import PhraseSymbol from "../interfaces/PhraseSymbol";

type PhraseType = string | PhraseSymbol;

export default class Phrase implements IDiffPhrase {
    constructor(public phrase: PhraseType, public diffKind?: DiffKind) {
    }

}