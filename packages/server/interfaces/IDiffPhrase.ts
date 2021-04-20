import DiffKind from "./DiffKind";
import { PhraseSymbol } from "@barrman/diffof-common/dist";

export default interface IDiffPhrase {
    diffKind?: DiffKind;

    isSymbol: boolean;

    phrase: string | PhraseSymbol;
}