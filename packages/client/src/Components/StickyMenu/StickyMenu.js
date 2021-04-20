import FancyButton from '../FancyButton/FancyButton';

const StickyMenu = ({ classes, loading, totalDocuments }) => (
    <div className={classes.stickyNav}>
        <nav>
            <FancyButton className={classes.navItem}>
                Next documents <i className="fas fa-arrow-right"></i>
            </FancyButton>
            <FancyButton className={classes.navItem}>
                <i className="fas fa-arrow-left"></i>
                Previous documents
            </FancyButton>
            {loading && <div className={classes.middleHeaderSection}>
                <div className={classes.loader}></div>
            </div>}
            <div className={classes.documentsInfo}>Showing {totalDocuments}</div>
        </nav>
    </div>);

export default StickyMenu;