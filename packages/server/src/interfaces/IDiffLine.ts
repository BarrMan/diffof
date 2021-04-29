import DiffKind from "./DiffKind";
import IDiffPhrase from "@barrman/diffof-common";

export interface IDiffLine {
    diffKind?: DiffKind;

    diffPhrases: IDiffPhrase[];
}