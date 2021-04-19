import { createUseStyles } from 'react-jss';

export default createUseStyles({
    fancyButton: {
        fontWeight: 'bold',
        fontSize: 16,
        display: 'block',
        backgroundColor: 'white',
        cursor: 'pointer',
        padding: 5,
        textAlign: 'center',
        borderRadius: 5,
        border: '1px solid #E1E4E8',
        color: '#032F62',

        '&:hover, &.selected': {
            backgroundColor: '#E1E4E8',
        },

        '&.disabled': {
            pointerEvents: 'none',
            color: '#E1E4E8',
        },
        '&.disabled:hover': {
            backgroundColor: 'white',
        },
    },
});