import useStyles from './FancyButton.styles';
import { mergeClassNames } from '../../Common/styles';

const FancyButton = ({ children, ...props }) => {
    const classes = useStyles();

    return <div className={mergeClassNames(props, classes.fancyButton)}>{children}</div>;
};

export default FancyButton;