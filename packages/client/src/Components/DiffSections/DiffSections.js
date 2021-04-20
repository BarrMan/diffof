import DiffSection from '../DiffSection/DiffSection';
// import DiffKind from '../../../dist/interfaces/DiffKind';
// import PhraseSymbol from '../../../dist/interfaces/PhraseSymbol';

const DiffSections = ({documentsDiffs = []}) => {
    const { prevDocs, nextDocs } = documentsDiffs.reduce((acc, documentPair) => {
        const [prevDoc, nextDoc] = documentPair;

        acc.prevDocs.push(prevDoc);
        acc.nextDocs.push(nextDoc);

        return acc;
    }, {prevDocs: [], nextDocs: []})

    return (<>
        <DiffSection docs={prevDocs} />
        <DiffSection docs={nextDocs} />
    </>);
}

export default DiffSections;