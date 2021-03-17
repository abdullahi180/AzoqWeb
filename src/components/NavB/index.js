import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link, useLocation } from "react-router-dom";
import Logo from "./../../images/clogo.png";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

import { attemptLogout } from "./../../redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const NavB = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(false);
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(attemptLogout());
  };

  useEffect(() => {
    setActiveMenu(false);
  }, [location]);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="AZoQ logo" />
          </Link>
        </div>

        <nav classname={`mainMenu ${activeMenu ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/basket">Your Basket[{totalNumCartItems}]</Link>
            </li>

            {currentUser && [
              <li key={1}>
                <Link to="/panel">
                  My Account
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
              <li key={2}>
                <span onClick={() => signOut()}>
                  Sign Out
                  <i class="fas fa-sign-out-alt"></i>
                </span>
              </li>,
            ]}

            {!currentUser && [
              <li key={1} className="hideOnMobile">
                <Link to="/register">Register</Link>
              </li>,
              <li key={2}>
                <Link to="/signin">
                  Sign in
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
            ]}

            <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>

            <li>
              <Link to="/contact">
                Contact
                <i class="fas fa-user-circle"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

NavB.defaultProps = {
  currentUser: null,
};

export default NavB;
