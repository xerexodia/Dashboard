import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import 'styles/mainNavBar.scss';
import { useStateContext } from 'context/authContext';
import Profile from 'layout/DashLayout/Header/HeaderContent/Profile/index';

const MainLayout = () => {
  const { user } = useStateContext();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-0 shadow-sm smaller-navbar">
        <div className="containerNavbar">
          <div className="navbar-brand">
            <img src="logo1.png" alt="Logo1" width="400" height="300" />
            <div className="logo-text">
              <div>Technologies Medicales et Scientifiques</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;التقنيات الطبية و العلمية&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>

          <ul className="navbar-nav mx-auto"> {/* Use mx-auto to center align the nav links */}
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Products">
                Produits
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/About">
                À propos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {user ? (
                <Profile />
              ) : (
                <NavLink className="auth" to="/login">
                  Se connecter
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MainLayout;
