import DiffSection, { SectionType } from '../DiffSection/DiffSection';
// import DiffKind from '../../../dist/interfaces/DiffKind';
// import PhraseSymbol from '../../../dist/interfaces/PhraseSymbol';

const DiffSections = ({ documentsDiffs = [] }) => {
    return (<>
        <DiffSection docs={documentsDiffs} sectionType={SectionType.PREVIOUS} />
        <DiffSection docs={documentsDiffs} sectionType={SectionType.CURRENT} />
    </>);
}

export default DiffSections;