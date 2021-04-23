import { DiffKind, PhraseSymbolCharacters } from '@barrman/diffof-common';
import { withClasses } from '../../Common/styles';

const DiffSection = ({ classes, docs, sectionType, selectedLine, setSelectedLine, unsetSelectedLine }) => {
    const phraseSymbols = {
        [PhraseSymbolCharacters.TAB]: () => <span className={classes.indent} />,
        [PhraseSymbolCharacters.SPACE]: () => '&nbsp;'
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

    const getDiffClass = diffKind => diffKindClasses[sectionType][diffKind];

    const renderPhrases = phrases => {
        return phrases.map((diffPhrase, i) => {
            const phraseDiffClass = getDiffClass(diffPhrase.diffKind);
            const phraseText = diffPhrase.isSymbol ? phraseSymbols[diffPhrase.phrase]() : diffPhrase.phrase;

            return <span key={i} className={phraseDiffClass}>{phraseText}</span>
        });
    };

    const generateSetSelectedLineFn = lineCount => () => setSelectedLine(lineCount);

    const renderCodeDiffs = () => {
        let lineCount = 1;
        return docs.map(docDiff => {
            return docDiff.diffLines.map(docLineDiff => {
                const diffClass = getDiffClass(docLineDiff.diffKind);

                return <div key={lineCount} className={withClasses(diffClass, classes.line, { [classes.highlight]: selectedLine === lineCount })} onMouseOver={generateSetSelectedLineFn(lineCount++)} onMouseOut={unsetSelectedLine}>{renderPhrases(docLineDiff.diffPhrases)}</div>
            })
        });
    }

    let lineCount = 1;

    return (
        <div id="previous-run" className={classes.diffSection}>
            <div className={classes.linesSection}>
                {docs.map(docDiff => {
                    return docDiff.diffLines.map(docLineDiff => <div key={lineCount} onMouseOver={generateSetSelectedLineFn(lineCount)} onMouseOut={unsetSelectedLine} className={withClasses(classes.lineCount, getDiffClass(docLineDiff.diffKind), { [classes.highlight]: selectedLine === lineCount })}>{lineCount++}</div>)
                })}
            </div>
            <div className={classes.codeSection}>
                {renderCodeDiffs()}
            </div>
        </div>
    );
}

export const SectionType = {
    CURRENT: 1,
    PREVIOUS: -1,
};

export default DiffSection;