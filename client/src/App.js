import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import PostView from './pages/PostView';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import Register from './pages/Register';

function App(){
  return (
    <AuthProvider>
      <Router>
        {/* add Navbar */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts/:id" element={<PostView/>} />
          <Route path="/new" element={<NewPost/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
