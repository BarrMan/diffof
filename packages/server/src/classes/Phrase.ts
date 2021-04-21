import IDiffPhrase from "@barrman/diffof-common/src/interfaces/IDiffPhrase";
import { PhraseSymbol, DiffKind } from "@barrman/diffof-common";

type PhraseType = string | PhraseSymbol;

export default class Phrase implements IDiffPhrase {
    constructor(public phrase: PhraseType, public diffKind?: DiffKind, public isSymbol = false) {
    }
}
