import './App.css';
import Home from './components/Home/Home';
//Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '@fontsource/roboto';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
