import DiffKind from "../interfaces/DiffKind";
import IDiffLine from "../interfaces/IDiffLine";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { PhraseSymbol } from "@barrman/diffof-common";

export default class DiffLineBuilder implements IDiffLine {
    constructor(public diffKind?: DiffKind, public diffPhrases: IDiffPhrase[] = []) {
    }

    addPhrase(phrase: IDiffPhrase): DiffLineBuilder {
        if (phrase instanceof PhraseSymbol) {
            phrase.isSymbol = true;
        }

        this.diffPhrases.push(phrase);

        return this;
    }
}