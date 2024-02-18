import './App.css';
import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
  } from 'react-router-dom';
import SignupComponent from './pages/Signup';
import SigninComponent from './pages/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
      </Routes>
    </Router>
  );
}



export default App;
