import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { GraphItem } from "./GraphItem";

export class StringPhrase implements IDiffPhrase<string>, GraphItem {
    public phrase;

    constructor(private _phrase: string, public diffKind?: DiffKind) {
        this.phrase = typeof _phrase === 'string' ? `"${_phrase}"` : _phrase;
    }

    graphId: string = `StringPhrase-${Math.ceil(Math.random()*100).toString()}`;
}