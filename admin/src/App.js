
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails'
import Transaction from './pages/Transaction';
import ScrollToTop from '../src/components/ScrollToTop/ScrollToTop'
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dash-board" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/user/:userId" element={<UserDetails/>}/>
        <Route path="/transactions" element={<Transaction/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
