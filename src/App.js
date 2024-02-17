import './App.css';
import {
  BrowserRouter
  as
  Router,
  // Route,
  Routes
  } from 'react-router-dom';


function App() {
  return (
    <Router>
        <p className='text-black'>Hola mundo</p>
      <Routes>
        {/* <Route path="/" exact component={} /> */}
        {/* <Route path="/about" component={} /> */}
      </Routes>
    </Router>
  );
}



export default App;
