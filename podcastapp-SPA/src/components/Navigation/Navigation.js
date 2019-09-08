import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/zencastLogo.svg';
import './Navigation.css';
import { auth } from '../../firebase/firebase.utils';

const Navigation = ({ funcs, currentUser }) => {
  const [menuSearchNode, setMenuSearchNode] = useState();
  const [navSearchNode, setNavSearchNode] = useState();

  let setSearchNodes = () => {
    setMenuSearchNode(document.querySelector('.menu-search'));
    setNavSearchNode(document.querySelector('.nav-search'));
  }

  useEffect(() => {
    setSearchNodes();
  })

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <a className="navbar-brand" href="">
        <span className="navbar-brand-svg"><Logo></Logo></span>  <i>enCast</i>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-item-discover">
            <NavLink to='/discover'
              onClick={() => funcs.onDisc(menuSearchNode, navSearchNode, true)}
              className="nav-link">     Discover
          </NavLink>
          </li>
          <li className="nav-item nav-item-popular">
            <NavLink to='/popular'
              onClick={() => funcs.onPop(menuSearchNode, navSearchNode)}
              className="nav-link">     Popular
          </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/about'
              onClick={() => funcs.onAbout(navSearchNode)}
              className="nav-link">         About Us
          </NavLink>
          </li>
        </ul>
        <form className="form-inline my-2 my-md-0">
          <input
            onChange={(e) => funcs.onSearch(e, menuSearchNode)}
            className="form-control nav-search" type="text" placeholder="Search" />
        </form>
      </div>
      <div className="nav-item dropdown">
        {currentUser
          ? <a className="nav-link dropdown" data-toggle="dropdown" aria-expanded="false">
            <img className="photoURL" src={currentUser.photoURL} />
          </a>
          : (<Link to='/sign-in' className="dropdown-sign-in option" href="">
                SIGN IN
              </Link>)
        }
        {currentUser
          ? <div className="dropdown-menu options" aria-labelledby="dropdown04">
            <div className='dropdown-item option'>
              <div className='dropdown-account'>
                <div className='dropdown-account-manage'>
                  <div className='account-manage-info'>
                    <div className='dropdown-account-name'>
                      {currentUser.displayName}
                    </div>
                    <div className='dropdown-account-email'>
                      {currentUser.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className='dropdown-status dim' onClick={() => auth.signOut()}>
                <i className='fas fa-sign-out-alt' />
                SIGN OUT
                </div>
              {console.log('curuser', currentUser)}
            </div>
        </div>
          : null
        }
      </div>
    </nav>
  )
}

export default Navigation;
