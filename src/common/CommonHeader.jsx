import React, { useEffect, useState } from "react";
import Styles from "../assets/css/PickupHeader.module.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../assets/images/Logo-icon.png";
import Profile from "../assets/images/PickupHead-Profile.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { EnterpriseNotificationModal } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/Constants";
import { logout } from "../redux/authSlice";
import localforage from "localforage";
import {
  deliveryboyRoute,
  enterpriseRoute,
  consumerRoute,
} from "../utils/RoutePath";

const CommonHeader = ({ userData }) => {
  const { userDetails, userInfo } = { ...userData };
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const handleLogout = () => {
    dispatch(logout());
    localforage.clear();
    navigate("/");
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className={Styles.pickupHeader}>
      <nav className={Styles.nav}>
        <input type="checkbox" id={Styles.navCheck} />
        <div className={Styles.navHeader}>
          <Link
            to={!isAuthenticated && !role ? "/" : `/${baseUrl}/dashboard`}
            className={Styles.homeHeaderLogocard}
          >
            <img className={Styles.homeHeaderLogo} src={Logo} alt="logo" />
            <h4 className={Styles.homeHeaderCompanyName}>Rapidmate</h4>
          </Link>
        </div>
        <div className={Styles.navBtn}>
          <label htmlFor={Styles.navCheck}>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <ul className={Styles.navList}>
          {userDetails?.role === "ENTERPRISE" &&
            enterpriseRoute.map((routes, index) => (
              <li key={index}>
                <Link to={routes.path}>{routes.title}</Link>
              </li>
            ))}
          {userDetails?.role === "CONSUMER" &&
            consumerRoute.map((routes, index) => (
              <li key={index}>
                <Link to={routes.path}>{routes.title}</Link>
              </li>
            ))}
          {/* {userDetails?.role === 'DELIVERY_BOY' && deliveryboyRoute.map((routes, index) => (
            <li key={index}>
              <Link to={routes.path}>{routes.title}</Link>
            </li>
          ))} */}

          <div className={Styles.loginNavList}>
            {userDetails?.role !== "DELIVERY_BOY" && (
              <>
                <li>
                  <button className={Styles.pickupHomeSettingsBtn}>
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                </li>
                <li>
                  <button
                    onClick={openModal}
                    className={Styles.pickupHomeSettingsBtn}
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                </li>
              </>
            )}

            <li>
              <Dropdown>
                <Dropdown.Toggle
                  className={Styles.pickupHeaderProfileActionBtn}
                  id="dropdown-basic"
                >
                  <img
                    className={Styles.pickupHeaderProfileImg}
                    src={API.viewImageUrl + userDetails?.profile_pic}
                    alt="Profile"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/${baseUrl}/setting`}
                    className={Styles.pickupHeaderAccountTextsActions}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faUser}
                    />{" "}
                    Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={Styles.pickupHeaderAccountTextsActions}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faGear}
                    />{" "}
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={Styles.pickupHeaderAccountTextsActions}
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faRightToBracket}
                    />{" "}
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </div>
        </ul>
      </nav>
      <EnterpriseNotificationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CommonHeader;
