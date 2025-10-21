import React from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
    return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyBlog</Link>
        </div>

        <div className="navbar-links">
            {user ? (
                <>
                <span className="navbar-user">Hello, {user.username}</span>
                <button className="navbar-logout" onClick={logout}>Logout</button>
                </>
            ) : (
                <>

                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Register</Link>
                </>
            )}
        </div>
    </nav>
    );
}