import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";

export class StringPhrase implements IDiffPhrase<string> {
    public phrase;

    constructor(private _phrase: string, public diffKind?: DiffKind) {
        this.phrase = typeof _phrase === 'string' ? `"${_phrase}"` : _phrase;
    }
}