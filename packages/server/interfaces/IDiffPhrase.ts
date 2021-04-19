import DiffKind from "./DiffKind";
import PhraseSymbol from "./PhraseSymbol";

export default interface IDiffPhrase {
    diffKind?: DiffKind;

    phrase: string | PhraseSymbol;
}