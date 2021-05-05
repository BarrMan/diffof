import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { GraphItem } from "./GraphItem";

export class KeyValuePhrase implements IDiffPhrase<string>, GraphItem {
    public phrase: string;

    constructor(key: string, value: string | number, public diffKind?: DiffKind) {
        this.phrase = `${key}: ${value}`;
    }
    graphId: string = `KeyValuePhrase-${Math.ceil(Math.random()*100).toString()}`;
}