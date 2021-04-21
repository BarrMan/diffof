import { DiffKind, PhraseSymbol } from '@barrman/diffof-common';
import { withClasses } from '../../Common/styles';
import styles from './DiffSection.styles';
import { withStyles } from '../../Common/styles';

const DiffSection = ({ classes, docs, sectionType }) => {
    const phraseSymbols = {
        [PhraseSymbol.TAB]: '&#9;',
        [PhraseSymbol.SPACE]: '&nbsp;'
    };

    const diffKindClasses = {
        [SectionType.CURRENT]: {
            [DiffKind.ADDED]: classes.added,
            [DiffKind.REMOVED]: classes.removed
        },
        [SectionType.PREVIOUS]: {
            [DiffKind.ADDED]: classes.removed,
            [DiffKind.REMOVED]: classes.added
        }
    };

    const renderPhrases = phrases => {
        return phrases.map(diffPhrase => {
            const phraseDiffClass = diffKindClasses[sectionType][diffPhrase.diffKind];
            const ps = PhraseSymbol;
            const isPhrase = diffPhrase.phrase instanceof PhraseSymbol;
            debugger;
            const phraseText = diffPhrase.phrase instanceof PhraseSymbol ? phraseSymbols[diffPhrase.phrase] : diffPhrase.phrase;

            return <span class={phraseDiffClass}>{phraseText}</span>
        });
    }

    console.log('docs', docs);
    console.log('sectionType', sectionType);

    let lineCount = 1;

    return (
        <div id="previous-run" className={classes.diffSection}>
            <div className={classes.linesSection}>
                {docs.map(docDiff => {
                    return docDiff.diffLines.map(() => <div className={classes.lineCount}>{lineCount++}</div>)
                })}
            </div>
            <div className={classes.codeSection}>
                {docs.map(docDiff => {
                    return docDiff.diffLines.map(docLineDiff => {
                        const diffClass = diffKindClasses[sectionType][docLineDiff.diffKind];

                        return <div class={withClasses(diffClass, classes.line)}>{renderPhrases(docLineDiff.diffPhrases)}</div>
                    })
                })}
            </div>
        </div>
    );
}

export const SectionType = {
    CURRENT: 1,
    PREVIOUS: -1,
};

export default withStyles(DiffSection)(styles);