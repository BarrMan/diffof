import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";

export class KeyValuePhrase implements IDiffPhrase<string> {
    public phrase: string;

    constructor(key: string, value: string | number, public diffKind?: DiffKind) {
        this.phrase = `${key}: ${value}`;
    }
}