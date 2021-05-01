import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/HeaderContainer';
import FancyButton from '../FancyButton/FancyButton';

const StickyMenu = ({ classes, loading, totalDocuments }) => (
  <div className={classes.stickyNav}>
    <nav>
      <FancyButton className={classes.navItem}>
        Next documents <i className="fas fa-arrow-right" />
      </FancyButton>
      <FancyButton className={classes.navItem}>
        <i className="fas fa-arrow-left" />
        &nbsp;Previous documents
      </FancyButton>
      <div className={classes.middleHeaderSection}>{loading ? <div className={classes.loader} /> : <Header />}</div>
      <div className={classes.documentsInfo}>
        Showing
        {totalDocuments}
      </div>
    </nav>
  </div>
);

StickyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  totalDocuments: PropTypes.number.isRequired,
};

export default StickyMenu;
