import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <Link to="/contact" className="nav-link">
        <img src='/contact.png' alt='Contact' />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
