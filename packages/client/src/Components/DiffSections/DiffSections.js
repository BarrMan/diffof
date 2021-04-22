import DiffSection from '../DiffSection/DiffSectionContainer';
import { SectionType } from '../DiffSection/DiffSection';

const DiffSections = ({ documentsDiffs = [] }) => {
    return (<>
        <DiffSection docs={documentsDiffs} sectionType={SectionType.PREVIOUS} />
        <DiffSection docs={documentsDiffs} sectionType={SectionType.CURRENT} />
    </>);
}

export default DiffSections;