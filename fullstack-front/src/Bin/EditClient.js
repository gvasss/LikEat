import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserLogin from '../layout/UserLogin';
import './Navbar.css';

export default function Navbar({ userRole, setUserRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUserRole("");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-wrapper">
      <div className="navbar-left">
        <div className="navbar-option">
          <Link to="/" className={`navbar-input ${isActive('/') ? 'checked' : ''}`}>
            <div className="navbar-btn">
              <span className="navbar-span">Home</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        {userRole === '' && (
          <div className="navbar-option">
            <UserLogin setUserRole={setUserRole} />
          </div>
        )}
        {userRole === 'admin' && (
          <>
            <div className="navbar-option">
              <Link to="/adminadmin" className={`navbar-input ${isActive('/adminadmin') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Admins</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/admincustomer" className={`navbar-input ${isActive('/admincustomer') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Customers</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/adminclient" className={`navbar-input ${isActive('/adminclient') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Clients</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/adminrestaurant" className={`navbar-input ${isActive('/adminrestaurant') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Restaurants</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/adminreview" className={`navbar-input ${isActive('/adminreview') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Reviews</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/profile" className={`navbar-input ${isActive('/profile') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">My Profile</span>
                </div>
              </Link>
            </div>
          </>
        )}
        {userRole === 'customer' && (
          <>
            <div className="navbar-option">
              <Link to="/customerreview" className={`navbar-input ${isActive('/customerreview') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Reviews</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/profile" className={`navbar-input ${isActive('/profile') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">My Profile</span>
                </div>
              </Link>
            </div>
          </>
        )}
        {userRole === 'client' && (
          <>
            <div className="navbar-option">
              <Link to="/clientrestaurant" className={`navbar-input ${isActive('/clientrestaurant') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">Restaurants</span>
                </div>
              </Link>
            </div>
            <div className="navbar-option">
              <Link to="/profile" className={`navbar-input ${isActive('/profile') ? 'checked' : ''}`}>
                <div className="navbar-btn">
                  <span className="navbar-span">My Profile</span>
                </div>
              </Link>
            </div>
          </>
        )}
        {userRole !== '' && (
          <div className="navbar-option">
            <button className="navbar-input navbar-btn" onClick={handleLogout}>
              <span className="navbar-span">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
