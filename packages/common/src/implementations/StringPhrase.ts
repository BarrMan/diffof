import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";

export class StringPhrase implements IDiffPhrase<string> {
    constructor(public phrase: string, public diffKind?: DiffKind) { }
}