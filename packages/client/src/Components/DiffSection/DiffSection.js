import { DiffKind, PhraseSymbol } from '@barrman/diffof-common/dist/index';

import styles from './DiffSection.styles';
import { withStyles } from '../../Common/styles';

const DiffSection = ({ classes, docs, sectionType }) => {
    const phraseSymbols = {
        [PhraseSymbol.TAB]: '&#9;',
        [PhraseSymbol.SPACE]: '&nbsp;'
    };

    const diffKindClasses = {
        [SectionType.CURRENT]: {
            [DiffKind.ADDED]: 'added',
            [DiffKind.REMOVED]: 'removed'
        },
        [SectionType.PREVIOUS]: {
            [DiffKind.ADDED]: 'removed',
            [DiffKind.REMOVED]: 'added'
        }
    };

    const renderPhrases = phrases => {
        return phrases.map(diffPhrase => {
            const phraseDiffClass = diffKindClasses[sectionType][diffPhrase.diffKind];
            const ps = PhraseSymbol;
            debugger;
            const phraseText = diffPhrase.phrase instanceof PhraseSymbol ? phraseSymbols[diffPhrase.phrase] : diffPhrase.phrase;

            return <div class={phraseDiffClass}>{phraseText}</div>
        });
    }

    console.log('docs', docs);
    console.log('sectionType', sectionType);

    return (
        <div id="previous-run" className={classes.diffSection}>
            <div id="previous-run-lines">
                {docs.map(docDiff => {
                    return docDiff.diffLines.map(docLineDiff => {
                        const diffClass = diffKindClasses[sectionType][docLineDiff.diffKind];

                        return <div class={diffClass}>{renderPhrases(docLineDiff.diffPhrases)}</div>
                    })
                })}
            </div>
            <div id="previous-run-code">{sectionType}</div>
        </div>
    );
}

export const SectionType = {
    CURRENT: 1,
    PREVIOUS: -1,
};

export default withStyles(DiffSection)(styles);