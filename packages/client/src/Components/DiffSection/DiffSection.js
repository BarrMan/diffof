import { DiffKind, PhraseSymbolCharacters } from "@barrman/diffof-common";
import { withClasses } from "../../Common/styles";
import Paragraph from "../Paragraph/Paragraph";

const DiffSection = ({ classes, docs, sectionType, selectedLine, setSelectedLine, unsetSelectedLine }) => {
  const phraseSymbols = {
    [PhraseSymbolCharacters.TAB]: () => <span className={classes.indent} />,
    [PhraseSymbolCharacters.SPACE]: () => " ",
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

  const getDiffClass = (diffKind) => diffKindClasses[sectionType][diffKind];

  const renderPhrases = (phrases) => {
    return phrases.map((diffPhrase, i) => {
      const phraseDiffClass = getDiffClass(diffPhrase.diffKind);
      const phraseText = diffPhrase.isSymbol ? phraseSymbols[diffPhrase.phrase]() : diffPhrase.phrase;

      return (
        <span key={i} className={phraseDiffClass}>
          {phraseText}
        </span>
      );
    });
  };

  const generateSetSelectedLineFn = (lineCount) => () => setSelectedLine(lineCount);

  const renderCodeDiffs = () => {
    let lineCount = 1;

    const renderParagraph = (paragraph) => {
      return (
        <Paragraph paragraphId={paragraph.id}>
          {paragraph.content.map((paragraphContent) => {
            if (paragraphContent.isParagraph) return renderParagraph(paragraphContent);

            const diffClass = getDiffClass(paragraphContent.diffKind);

            return (
              <div
                key={lineCount}
                className={withClasses(diffClass, classes.line, {
                  [classes.highlight]: selectedLine === lineCount,
                })}
                onMouseOver={generateSetSelectedLineFn(lineCount++)}
                onMouseOut={unsetSelectedLine}
              >
                {renderPhrases(paragraphContent.diffPhrases)}
              </div>
            );
          })}
        </Paragraph>
      );
    };

    return docs.map((docDiff) => {
      return docDiff.paragraphs.map((paragraph) => {
        return renderParagraph(paragraph);
      });
    });
  };

  const renderLinesCount = () => {
    let lineCount = 1;

    const renderParagraph = (paragraph) => {
      return paragraph.content.map((paragraphContent) => {
        if (paragraphContent.isParagraph) return renderParagraph(paragraphContent);

        return (
          <div
            key={lineCount}
            onMouseOver={generateSetSelectedLineFn(lineCount)}
            onMouseOut={unsetSelectedLine}
            className={withClasses(classes.lineCount, getDiffClass(paragraphContent.diffKind), {
              [classes.highlight]: selectedLine === lineCount,
            })}
          >
            {lineCount++}
          </div>
        );
      });
    };

    return docs.map((docDiff) => {
      return docDiff.paragraphs.map((paragraph) => {
        return renderParagraph(paragraph);
      });
    });
  };

  return (
    <div className={classes.diffSection}>
      <div className={classes.linesSection}>{renderLinesCount()}</div>
      <div className={classes.codeSection}>{renderCodeDiffs()}</div>
    </div>
  );
};

export const SectionType = {
  CURRENT: 1,
  PREVIOUS: -1,
};

export default DiffSection;
