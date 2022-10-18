import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../buttons/Button';
import './Navbar.scss';

function Navbar2() {
    const [clickNav,  setClickNav] = useState(false);
    const [button,  setButton] = useState(true);

    const handleClick = () => setClickNav(!clickNav)
    const closeMobileMenu = () => setClickNav(false)

    const showButton = () => {
        if(window.innerwidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    }

    window.addEventListener('resize', showButton);

    return (
        <>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to="#" className="navbar-logo">
                        <MdFingerprint className="navbar-icon"/>
                        AGUNG
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        { clickNav ? <FaTimes/> : <FaBars/>  }
                    </div>

                    <ul className={ clickNav ? 'nav-menu active' : 'nav-menu'  }>
                        <li className="nav-item">
                            <Link to="#" className="nav-links">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-links">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-links">
                                Products
                            </Link>
                        </li>
                        <li className="nav-btn">
                            {button ? (
                                <Link to="/sign-up" className="btn-link">
                                    <Button buttonStyle="btn-outline">
                                        Sign Up
                                    </Button>   
                                </Link>
                                
                            ) : (
                                <Link to="/sign-up" className="btn-link">
                                    <Button buttonStyle="btn-outline"
                                            buttonSize="btn-mobile">
                                        Sign Up
                                    </Button>   
                                </Link>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Navbar2
