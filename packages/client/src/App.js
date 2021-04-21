import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import './App.css';
import theme from './App.theme';
import JsonDiff from './Components/JsonDiff/JsonDiffContainer';
import StickyMenu from './Components/StickyMenu/StickyMenuContainer';
import ChangeGroups from './Components/ChangeGroups';
import DiffSections from './Components/DiffSections/DiffSectionsContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <JsonDiff>
          <StickyMenu />
          <ChangeGroups />
          <DiffSections />
        </JsonDiff>
      </Router>
    </ThemeProvider>
  );
}

export default App;
