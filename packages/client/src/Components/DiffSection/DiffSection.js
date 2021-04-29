import { DiffKind, PhraseSymbolCharacters } from "@barrman/diffof-common";
import { withClasses } from "../../Common/styles";
import Paragraph from "../Paragraph/ParagraphContainer";

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

  const renderPhrases = (phrases) => {
    return phrases
      .filter((phrase) => {
        return typeof phrase.diffKind === "number" ? renderDiffPhrase[sectionType][phrase.diffKind] : true;
      })
      .map((diffPhrase, i) => {
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

    const renderIndentation = (indent) => {
      return new Array(indent).fill().map(() => phraseSymbols[PhraseSymbolCharacters.TAB]());
    };

    const renderParagraph = (paragraph, indent = 0) => {
      return (
        <Paragraph paragraphId={paragraph.id}>
          {paragraph.content.map((paragraphContent) => {
            if (paragraphContent.isParagraph) return renderParagraph(paragraphContent, paragraph.indent + indent);

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
                {renderIndentation(paragraph.indent + indent)}
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
