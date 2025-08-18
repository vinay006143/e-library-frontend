import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage"
import Login from "./components/Login"

import Register from "./components/Register"
import Toast from './components/Toast';
 import UserDashboard from './components/UserDashboard';
import About from './components/About';
import Featurepage from './components/Featurepage';
import AdminDashboard from './components/AdminDashboard';
import AllBooksPage from './components/AllBooksPage'
import ReadBook from './components/ReadBook';
import UserProfileDetailsSection from "./components/UserProfileDetailsSection";

function App() {
  return (
    <>
   
    <Toast/>
   
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Featurepage/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/books" element={<AllBooksPage/>}/>
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/read/works/:bookId" element={<ReadBook />} />
        
      </Routes>
  
    </>
    
  )
}

export default App
