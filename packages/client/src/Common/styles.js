import { useTheme } from 'react-jss';

export const withClasses = (...classes) => {
    return classes.filter(className => typeof className === 'string').join(' ');
};

export const mergeClassNames = (parentProps, className) => {
    return withClasses(parentProps.className, className);
};

export const withStyles = Comp => stylesFn => props => {
    const theme = useTheme();
    const classes = stylesFn(theme);

    return <Comp classes={classes} {...props} />
}