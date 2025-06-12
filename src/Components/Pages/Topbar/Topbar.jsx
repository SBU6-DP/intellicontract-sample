import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './topbar.css'
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs'
import profile from '../../../images/icons/profile-1.jpg'
import { useMsal } from '@azure/msal-react'
import bell from '../../../images/icons/bell-02.svg'

import srm_white_logo from '../../../images/Logo/logo_srm_white.png'

import nexus from '../../../images/Logo/NexusLabs-Logo.png'

function Topbar() {
    const navigate = useNavigate()
    const { instance,accounts} = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3000/", // 🔁 Back to login page or home
    });
  };

  console.log(accounts)
    return (
      <nav className="header" role="navigation">
        <div className="header-left">
          <h6 className="nav-title">
            {/* <img src={nexus}/> */}
            <img src={srm_white_logo} className="sidebar-logo" />
            IntelliContract
          </h6>
        </div>
        <div className="header-right">
          {/* <div className="header-icon">
        <img src={messageIcon} alt="Message" />
      </div> */}
          {/* <div className="header-icon">
        <img src={bellIcon} alt="Notification" />
      </div> */}

          <span></span>
          <div className="header-profile">
            <div className="d-flex align-items-center gap-2">
              <img src={bell} className="header-notifi" />
              <img
                src={profile}
                className="profile-img"
                alt="Profile"
                title={`${accounts[0]?.name}`}
              />
              {/* <img src={dropdown} alt="Dropdown" /> */}
            </div>
            <ul className="header-profile-dropdown">
              <Link to={"/profile"}>
                <li>My Profile</li>
              </Link>
              {/* <li>Manage Address</li> */}
              <li className="logout" onClick={() => handleLogout()}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Topbar