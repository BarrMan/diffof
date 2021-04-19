import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import JsonDiff from './Components/JsonDiff/JsonDiffContainer';
import StickyMenu from './Components/StickyMenu/StickyMenuContainer';
import ChangeGroups from './Components/ChangeGroups';
import DiffSections from './Components/DiffSections/DiffSectionsContainer';

function App() {
  return (
    <Router>
      <JsonDiff>
        <StickyMenu />
        <ChangeGroups />
        <DiffSections />
      </JsonDiff>
    </Router>
  );
}

export default App;
