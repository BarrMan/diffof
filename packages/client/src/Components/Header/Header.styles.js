import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  green: {
    color: '#6dff88',
  },
  red: {
    color: '#ffb2bb',
  },
  borderDotted: {
    borderBottom: '1px dashed black',
  },
  italic: {
    fontStyle: 'italic',
  },
}));
