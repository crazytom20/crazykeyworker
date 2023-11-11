import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Visorcuencananay from './Views/VisorcuencaNanay';


function App() {
  return (
    <Router basename='/visorcuenca'  >
  
      <Routes>
        <Route path="/" element={<Visorcuencananay />} />
      </Routes>

  </Router>
  );
}

export default App;
