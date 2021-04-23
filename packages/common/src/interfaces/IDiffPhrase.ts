import { DiffKind } from "./DiffKind";
import { PhraseSymbolCharacters } from "./PhraseSymbolCharacters";

export default interface IDiffPhrase<PhraseType = string | PhraseSymbolCharacters> {
    diffKind?: DiffKind;

    phrase: PhraseType;
}