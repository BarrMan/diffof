import React from 'react';
import PropTypes from 'prop-types';
import DiffSection from '../DiffSection/DiffSectionContainer';
import { SectionType } from '../DiffSection/DiffSection';

const DiffSections = ({ documentsDiffs = [] }) => (
  <>
    <DiffSection docs={documentsDiffs} sectionType={SectionType.PREVIOUS} />
    <DiffSection docs={documentsDiffs} sectionType={SectionType.CURRENT} />
  </>
);

DiffSections.propTypes = {
  documentsDiffs: PropTypes.array.isRequired,
};

export default DiffSections;
