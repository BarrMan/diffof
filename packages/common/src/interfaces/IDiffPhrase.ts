import { DiffKind } from "./DiffKind";
import { PhraseSymbol } from "./PhraseSymbol";

export default interface IDiffPhrase<PhraseType = string | PhraseSymbol> {
    diffKind?: DiffKind;

    phrase: PhraseType;
}