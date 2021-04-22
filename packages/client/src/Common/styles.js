import { useTheme } from 'react-jss';

export const withClasses = (...classes) => {
    const reducedClasses = classes.reduce((acc, classObj) => {
        let classNames = classObj || [''];
        const c = classes;
        switch (typeof classObj) {
            case 'string':
                classNames = [classObj];
                break;
            case 'object':
                classNames = Object.entries(classObj).map(([_className, isVisible]) => isVisible ? _className : '');
                break;
        }

        const filteredClassNames = classNames.filter(className => typeof className === 'string' && className.length);
        acc.push(...filteredClassNames);

        return acc;
    }, []);

    return reducedClasses.join(' ');
};

export const mergeClassNames = (parentProps, className) => {
    return withClasses(parentProps.className, className);
};

export const withStyles = Comp => stylesFn => props => {
    const theme = useTheme();
    const classes = stylesFn(theme);

    return <Comp classes={classes} {...props} />
}