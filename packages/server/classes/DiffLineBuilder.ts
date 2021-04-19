import DiffKind from "../interfaces/DiffKind";
import IDiffLine from "../interfaces/IDiffLine";
import IDiffPhrase from "../interfaces/IDiffPhrase";

export default class DiffLineBuilder implements IDiffLine {
    constructor(public diffKind?: DiffKind, public diffPhrases: IDiffPhrase[] = []) {
    }

    addPhrase(phrase: IDiffPhrase) {
        this.diffPhrases.push(phrase);

        return this;
    }
}