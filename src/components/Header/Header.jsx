import './Header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const navigat = useNavigate();
  return (
    <>
      <header>
        <div className="header-container">
          <Link to={'/'} className="logo">
            <img src="../image/logo/logo.png" className="img-responsive img-fluid" alt="Logo Not found" />
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button">
              <i className="bi bi-search"></i>
            </button>
          </div>
          <div className="nav-links">
            {Cookies.get('user') ? (
              <button className="sign" onClick={() => { Cookies.remove('user'); navigat('/'); }}>
                LogOut
              </button>) :
              (<button className="sign" onClick={() => { navigat('/login') }}>
                Login
              </button>)
            }
            <Link to="/cart">
              <i className="bi bi-cart4"></i> Cart
            </Link>
          </div>
        </div>
      </header>
    </>





  )
}





