export const withClasses = (...classes) => {
    return classes.filter(className => typeof className === 'string').join(' ');
};

export const mergeClassNames = (parentProps, className) => {
    return withClasses(parentProps.className, className);
};

export const withStyles = Comp => stylesFn => props => {
    const classes = stylesFn();

    return <Comp classes={classes} {...props} />
}