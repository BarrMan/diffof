import { withClasses } from '../../Common/styles';

const Header = ({ classes }) => {
    return <span className={classes.header}><span className={withClasses(classes.green, classes.borderDotted)}>Diff</span><span className={withClasses(classes.red, classes.italic)}>Of</span></span>
}

export default Header;