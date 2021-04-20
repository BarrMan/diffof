import DiffKind from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { PhraseSymbol } from "@barrman/diffof-common/dist";

type PhraseType = string | PhraseSymbol;

export default class Phrase implements IDiffPhrase {
    constructor(public phrase: PhraseType, public diffKind?: DiffKind, public isSymbol = false) {
    }
}