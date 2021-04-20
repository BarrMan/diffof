import { keyBy } from 'lodash';
import DiffInfoBuilder from '../classes/DiffInfoBuilder';
import Phrase from '../classes/Phrase';
import DiffKind from '../interfaces/DiffKind';

import IDiffInfo from '../interfaces/IDiffInfo';
import IDiffState from '../interfaces/IDiffState';
import PhraseSymbol from '../interfaces/PhraseSymbol';
import DiffStrategy from './DiffStrategy';

type DocumentType = Record<string, unknown>;
export default class DocumentDiffStrategy implements DiffStrategy<DocumentType, IDiffInfo, DocumentDiffOptions> {
    getDiffPairs = (prevCollection: DocumentType[], nextCollection: DocumentType[], diffOptions: DocumentDiffOptions): IDiffState<DocumentType>[] => {
        const [prevHashes, nextHashes] = [keyBy(prevCollection, diffOptions.uniqueKey), keyBy(nextCollection, diffOptions.uniqueKey)];

        return Object.entries(prevHashes).map(([key, value]) => ({
            prev: value,
            next: nextHashes[key],
        }));
    };

    getDiffs = (diffStates: IDiffState<DocumentType>[]): [IDiffInfo, IDiffInfo][] => {
        const diffs = diffStates.map(diffState => {
            return this.evaluateDocumentDiffs(diffState);
        });
        return diffs;
    };

    private evaluateDocumentDiffs = (diffState: IDiffState<DocumentType>): [IDiffInfo, IDiffInfo] => {
        const prevDiff = new DiffInfoBuilder();
        const nextDiff = new DiffInfoBuilder();

        prevDiff.addLine().addPhrase(new Phrase('{'));
        nextDiff.addLine().addPhrase(new Phrase('{'));

        prevDiff.addLine(DiffKind.ADDED).addPhrase(new Phrase(PhraseSymbol.TAB)).addPhrase(new Phrase('someProperty: "someValue",'));
        nextDiff.addLine(DiffKind.REMOVED).addPhrase(new Phrase(PhraseSymbol.TAB)).addPhrase(new Phrase('differentProperty: "someValue",'));

        return [prevDiff, nextDiff]
    }

    fileMask = 'json';
}