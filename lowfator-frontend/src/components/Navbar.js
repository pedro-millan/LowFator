import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
      <Link to="/about" className="nav-link">
        <img src='/about.png' alt='About' id='about_link'/>
        </Link>
        <Link to="/contact" className="nav-link">
        <img src='/contact.png' alt='Contact' id='contact_link'/>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
