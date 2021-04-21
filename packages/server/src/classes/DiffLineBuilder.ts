import DiffKind from "../interfaces/DiffKind";
import IDiffLine from "../interfaces/IDiffLine";
import { IDiffPhrase } from "@barrman/diffof-common";

export default class DiffLineBuilder implements IDiffLine {
    constructor(public diffKind?: DiffKind, public diffPhrases: IDiffPhrase[] = []) {
    }

    addPhrase(phrase: IDiffPhrase): DiffLineBuilder {
        this.diffPhrases.push(phrase);

        return this;
    }
}