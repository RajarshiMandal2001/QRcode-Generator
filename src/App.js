import './App.css';
import Demo from './components/Demo';
import { Route, Routes } from 'react-router-dom';
import QRcodeAsPNG from './components/QRcodeAsPNG';
import Introduction from './components/Introduction';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/"  element={<Introduction />} />
          <Route path="fillform" element={<Demo />} />
          <Route path="yourqr" element={<QRcodeAsPNG />} />
        </Routes>
    </div>
  );
}

export default App;
