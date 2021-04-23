
import './App.css';
import TableTest from './component/TableTest';
import TableView from './pages/TableView/TableView';

function App() {
  return (
    <div className="App">
      <header>
        <h2>DICOM Explorer</h2>
      </header>
      <TableTest/>
      <TableView/>
    </div>
  );
}

export default App;
