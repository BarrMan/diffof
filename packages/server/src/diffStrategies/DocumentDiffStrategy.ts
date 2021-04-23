import { keyBy } from 'lodash';
import DiffInfoBuilder from '../classes/DiffInfoBuilder';
import DiffKind from '../interfaces/DiffKind';

import IDiffInfo from '../interfaces/IDiffInfo';
import IDiffState from '../interfaces/IDiffState';
import { KeyValuePhrase, StringPhrase, PhraseSymbolCharacters } from '@barrman/diffof-common';
import DiffStrategy from './DiffStrategy';
import { isPrimitiveType } from '../classes/isPrimitiveType';

type DocumentType = Record<string, unknown>;
export default class DocumentDiffStrategy implements DiffStrategy<DocumentType, IDiffInfo, DocumentDiffOptions> {
    getDiffPairs = (prevCollection: DocumentType[], nextCollection: DocumentType[], diffOptions: DocumentDiffOptions): IDiffState<DocumentType>[] => {
        const [prevHashes, nextHashes] = [keyBy(prevCollection, diffOptions.uniqueKey), keyBy(nextCollection, diffOptions.uniqueKey)];

        return Object.entries(prevHashes).map(([key, value]) => ({
            prev: value,
            next: nextHashes[key] || {},
        })).concat(Object.entries(nextHashes).filter(([key]) => !prevHashes[key]).map(([, val]) => ({
            prev: {},
            next: val,
        })));
    };

    getDiffs = (diffStates: IDiffState<DocumentType>[]): IDiffInfo[] => {
        console.log('diffStates', diffStates);
        const diffs = diffStates.map(diffState => {
            return this.evaluateDocumentDiffs(diffState);
        });

        return diffs;
    };

    private render(diffKind: DiffKind | (() => DiffKind), obj: unknown): IDiffInfo {
        const diffInfo = new DiffInfoBuilder();

        const getDiffKind = typeof diffKind === 'function' ? diffKind : () => diffKind;

        if (Array.isArray(obj)) {
            diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase('['));
            obj.forEach(item => diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase(`${item},`)));
            diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase(']'));
        } else if (typeof obj === 'object') {
            diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase('{'));
            Object.entries(obj).forEach(([key, val]) => {
                const line = diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase(`${key}:`));
                if (isPrimitiveType(val)) {
                    line.addPhrase(new StringPhrase(val));
                } else {
                    diffInfo.concat(this.render(diffKind, val));
                }
            });
            diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase('}'));
        } else {
            diffInfo.addLine(getDiffKind()).addPhrase(new StringPhrase(obj));
        }

        return diffInfo;
    }

    private evalulatePropertyDiffs(prev: unknown, next: unknown): IDiffInfo {
        const diffInfo = new DiffInfoBuilder();

        if (typeof prev !== typeof next || Array.isArray(prev) !== Array.isArray(next)) {
            // unmatches types
            console.log('unmatched type');
            diffInfo.concat(this.render(DiffKind.REMOVED, prev));
            diffInfo.concat(this.render(DiffKind.ADDED, next));
        } else {
            // same type
            console.log('same type');
            diffInfo.concat(this.render(DiffKind.NONE, next));
        }

        // Object.entries(prev).forEach(([prevKey, prevVal]) => {
        //     if (!(prevKey in next)) {
        //         diffInfo.addLine(DiffKind.REMOVED).addPhrase(new KeyValuePhrase(prevKey, prevVal));
        //     } else {
        //         const nextVal = next[prevKey];

        //         if (isPrimitiveType(prevVal) && isPrimitiveType(nextVal)) {
        //             if (prevVal === nextVal) {
        //                 diffInfo.addLine().addPhrase(new KeyValuePhrase(prevKey, prevVal));
        //             } else {
        //                 diffInfo.addLine(DiffKind.REMOVED).addPhrase(new KeyValuePhrase(prevKey, prevVal));
        //                 diffInfo.addLine(DiffKind.ADDED).addPhrase(new KeyValuePhrase(prevKey, nextVal));
        //             }
        //         } else if (isPrimitiveType(prevVal) !== isPrimitiveType(nextVal)) {
        //             diffInfo.concat(this.evaluateDocumentDiffs(prevVal, nextVal));
        //             // diffInfo.concat(this.evalulatePropertyDiffs({ [prevKey]: prevVal }, { [prevKey]: nextVal }));
        //         }
        //     }
        // });

        return diffInfo;
    }

    private evaluateDocumentDiffs = (diffState: IDiffState<DocumentType>): IDiffInfo => {
        const diffInfo = new DiffInfoBuilder();

        console.log('evaluatingDocumentDiffs');
        diffInfo.addLine().addPhrase(new StringPhrase('{'));

        const propertyDiffs = this.evalulatePropertyDiffs(diffState.prev, diffState.next)
        diffInfo.concat(propertyDiffs);

        diffInfo.addLine().addPhrase(new StringPhrase('}'));

        return diffInfo;
    }

    fileMask = 'json';
}
