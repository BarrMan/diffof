/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { DiffKind, PhraseSymbolCharacters } from '@barrman/diffof-common';
import { withClasses } from '../../Common/styles';
import Paragraph from '../Paragraph/ParagraphContainer';

export const SectionType = {
  CURRENT: 1,
  PREVIOUS: -1,
};

const DiffSection = ({ classes, docs, sectionType, selectedLine, setSelectedLine, unsetSelectedLine }) => {
  const phraseSymbols = {
    [PhraseSymbolCharacters.TAB]: () => <span className={classes.indent} />,
    [PhraseSymbolCharacters.SPACE]: () => ' ',
  };

  const diffKindClasses = {
    [SectionType.CURRENT]: {
      [DiffKind.ADDED]: classes.added,
      [DiffKind.REMOVED]: classes.removed,
    },
    [SectionType.PREVIOUS]: {
      [DiffKind.ADDED]: classes.removed,
      [DiffKind.REMOVED]: classes.added,
    },
  };

  const renderDiffPhrase = {
    [SectionType.CURRENT]: {
      [DiffKind.ADDED]: true,
      [DiffKind.REMOVED]: false,
    },
    [SectionType.PREVIOUS]: {
      [DiffKind.ADDED]: false,
      [DiffKind.REMOVED]: true,
    },
  };

  const getDiffClass = (diffKind) => diffKindClasses[SectionType.CURRENT][diffKind];

  const renderPhrases = (phrases) =>
    phrases
      .filter((phrase) => (phrase.diffKind === 'number' ? renderDiffPhrase[sectionType][phrase.diffKind] : true))
      .map((diffPhrase) => {
        const phraseDiffClass = getDiffClass(diffPhrase.diffKind);
        const phraseText = diffPhrase.isSymbol ? phraseSymbols[diffPhrase.phrase]() : diffPhrase.phrase;

        return <span className={phraseDiffClass}>{phraseText}</span>;
      });

  const generateSetSelectedLineFn = (lineCount) => () => setSelectedLine(lineCount);

  const renderCodeDiffs = () => {
    let lineCount = 1;

    const renderIndentation = (indent) =>
      new Array(indent).fill().map(() => phraseSymbols[PhraseSymbolCharacters.TAB]());

    const renderParagraph = (paragraph, indent = 0) => (
      <Paragraph paragraphId={paragraph.id}>
        {paragraph.content.map((paragraphContent) => {
          if (paragraphContent.isParagraph) return renderParagraph(paragraphContent, paragraph.indent + indent);

          const diffClass = getDiffClass(paragraphContent.diffKind);

          lineCount++;
          const currentLineCount = lineCount - 1;
          const shouldRenderLine =
            typeof paragraphContent.diffKind === 'number'
              ? renderDiffPhrase[sectionType][paragraphContent.diffKind]
              : true;

          return (
            <div
              key={currentLineCount}
              className={withClasses(diffClass, classes.line, {
                [classes.highlight]: selectedLine === currentLineCount,
              })}
              onMouseOver={generateSetSelectedLineFn(currentLineCount)}
              onMouseOut={unsetSelectedLine}
              onFocus={() => {}}
              onBlur={() => {}}
              title={paragraph.id}
            >
              {shouldRenderLine && [
                renderIndentation(paragraph.indent + indent),
                renderPhrases(paragraphContent.diffPhrases),
              ]}
            </div>
          );
        })}
      </Paragraph>
    );

    return docs.map((docDiff) => docDiff.paragraphs.map((paragraph) => renderParagraph(paragraph)));
  };

  const renderLinesCount = () => {
    let lineCount = 1;

    const renderParagraph = (paragraph) =>
      paragraph.content.map((paragraphContent) => {
        if (paragraphContent.isParagraph) return renderParagraph(paragraphContent);

        return (
          <div
            key={lineCount}
            onMouseOver={generateSetSelectedLineFn(lineCount)}
            onMouseOut={unsetSelectedLine}
            className={withClasses(classes.lineCount, getDiffClass(paragraphContent.diffKind), {
              [classes.highlight]: selectedLine === lineCount,
            })}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {lineCount++}
          </div>
        );
      });

    return docs.map((docDiff) => docDiff.paragraphs.map((paragraph) => renderParagraph(paragraph)));
  };

  return (
    <div className={classes.diffSection}>
      <div className={classes.linesSection}>{renderLinesCount()}</div>
      <div className={classes.codeSection}>{renderCodeDiffs()}</div>
    </div>
  );
};

DiffSection.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.array.isRequired,
  sectionType: PropTypes.string.isRequired,
  selectedLine: PropTypes.number.isRequired,
  setSelectedLine: PropTypes.func.isRequired,
  unsetSelectedLine: PropTypes.func.isRequired,
};

export default DiffSection;
