import DiffKind from "./DiffKind";
import IDiffPhrase from "@barrman/diffof-common";

export default interface IDiffLine {
    diffKind?: DiffKind;

    diffPhrases: IDiffPhrase[];
}