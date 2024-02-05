import React from 'react';
import Cookies from 'js-cookie';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

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

      {/* Header 2 */}

      <nav>
        <div className="wrapper">
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn"> <i className="fas fa-times" /> </label>
            <li> <Link to={'#'}>Home</Link></li>
            <li> <Link to={'#'}>About</Link></li>
            <li> <Link to={'#'} className="desktop-item"> Dropdown Menu </Link>

              <input type="checkbox" id="showDrop" />
              <label htmlFor="showDrop" className="mobile-item"> Dropdown Menu </label>
              <ul className="drop-menu">
                <li><Link to={'#'}>Drop menu 1</Link> </li>
                <li>
                  <Link to={'#'}>Drop menu 2</Link>
                </li>
                <li>
                  <Link to={'#'}>Drop menu 3</Link>
                </li>
                <li>
                  <Link to={'#'}>Drop menu 4</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={'#'} className="desktop-item">
                Mega Menu
              </Link>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                Mega Menu
              </label>
              <div className="mega-box">
                <div className="content">
                  <div className="row">
                    <img
                      src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <header>Design Services</header>
                    <ul className="mega-links">
                      <li>
                        <Link to={'#'}>Graphics</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Vectors</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Business cards</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Custom logo</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Email Services</header>
                    <ul className="mega-links">
                      <li>
                        <Link to={'#'}>Personal Email</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Business Email</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Mobile Email</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Web Marketing</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <header>Security services</header>
                    <ul className="mega-links">
                      <li>
                        <Link to={'#'}>Site Seal</Link>
                      </li>
                      <li>
                        <Link to={'#'}>VPS Hosting</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Privacy Seal</Link>
                      </li>
                      <li>
                        <Link to={'#'}>Website design</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to={'#'}>Feedback</Link>
            </li>
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars" />
          </label>
        </div>
      </nav>

    </>





  )
}





