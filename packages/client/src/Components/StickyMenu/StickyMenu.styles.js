import { createUseStyles } from 'react-jss';

export default createUseStyles({
  stickyNav: {
    height: 40,
    zIndex: 100,
    width: '100%',
    position: 'fixed',
    top: 0,
    right: 0,

    '& nav': {
      height: 40,
      width: '100%',
      backgroundColor: 'white',
      borderBottom: '1px solid #E1E4E8',
      paddingTop: 10,
      '-webkitBoxShadow': '0px 3px 11px -1px #E1E4E8',
      boxShadow: '0px 3px 11px -1px #E1E4E8',
    },
  },
  navItem: {
    float: 'right',
    width: 200,
    marginLeft: 10,
    marginRight: 10,
  },
  middleHeaderSection: {
    float: 'right',
    width: 300,
    marginTop: 7,
    marginBottom: 50,
  },
  loader: {
    display: 'block',
    margin: '0 auto',
    fontWeight: 'bold',
    fontSize: 15,
  },
  documentsInfo: {
    float: 'left',
    width: 400,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 50,
    marginTop: 7,
    marginLeft: 20,
  },
});
