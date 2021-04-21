import DiffKind from "./DiffKind";
import IDiffPhrase from "./IDiffPhrase";

export default interface IDiffLine {
    diffKind?: DiffKind;

    diffPhrases: IDiffPhrase[];
}