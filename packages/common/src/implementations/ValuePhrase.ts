import { DiffKind } from "../interfaces/DiffKind";
import IDiffPhrase from "../interfaces/IDiffPhrase";
import { GraphItem } from "./GraphItem";

type ValueType = string | number;

export class ValuePhrase implements IDiffPhrase<ValueType>, GraphItem {
  public phrase;

  constructor(private _phrase: ValueType, public diffKind?: DiffKind) {
    this.phrase =
      typeof _phrase === "string"
        ? `"${_phrase}"`
        : new String(_phrase).toString();
  }

  graphId: string = `ValuePhrase-${Math.ceil(Math.random() * 100).toString()}`;
}
