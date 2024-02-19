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
import UserProfile from './pages/User';
import Books from './pages/Books';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}



export default App;
