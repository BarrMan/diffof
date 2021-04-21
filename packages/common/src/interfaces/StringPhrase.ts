import { DiffKind } from "./DiffKind";
import IDiffPhrase from "./IDiffPhrase";

export class StringPhrase implements IDiffPhrase<string> {
    constructor(public phrase: string, public diffKind?: DiffKind) { }
}