import { createUseStyles } from 'react-jss';

const lineStyle = (theme) => ({
  borderBottom: '1px #E1E4E8 dashed',
  boxSizing: 'border-box',
  width: '100%',
  paddingLeft: 5,
  height: theme.lineHeight,
});

export default createUseStyles((theme) => ({
  diffSection: {
    border: '1px solid #E1E4E8',
    borderRadius: 5,
    minHeight: '100%',
    width: `calc(50% - ${theme.lineHeight} - 150px)`,
    lineHeight: theme.lineHeight,
    boxSizing: 'border-box',
    marginTop: 60,
    float: 'left',
    marginLeft: 10,
  },
  lineCount: lineStyle(theme),
  line: lineStyle(theme),
  codeSection: {
    float: 'left',
    width: 'calc(100% - 50px)',
  },
  linesSection: {
    float: 'left',
    width: 50,
    height: '100%',
    color: '#76797B',
    boxSizing: 'border-box',
  },
  added: {
    backgroundColor: theme.green,
  },
  removed: {
    backgroundColor: theme.red,
  },
  indent: {
    paddingLeft: 30,
  },
  highlight: {
    backgroundColor: '#E1E4E8',
  },
}));
