
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dash-board" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/user/:userId" element={<UserDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
