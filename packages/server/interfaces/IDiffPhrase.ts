import DiffKind from "./DiffKind";
import { PhraseSymbol } from "@barrman/diffof-common";

export default interface IDiffPhrase {
    diffKind?: DiffKind;

    isSymbol: boolean;

    phrase: string | PhraseSymbol;
}