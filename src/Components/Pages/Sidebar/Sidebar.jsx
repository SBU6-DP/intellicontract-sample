import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import nexus from '../../../images/Logo/NexusLabs-Logo.png'
import hide_sidebar from '../../../images/icons/left_close.png'

import logo from '../../../images/sidebar_icons/Logomark.svg'
import settings from '../../../images/icons/settings-01.svg'

function Sidebar() {
  const [sidebarMenu, setSidebarMenu] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSidebarMenu(SidebarData);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = SidebarData.find((item) =>
      currentPath.startsWith(item.link)
    );
    if (active) {
      setActiveMenu(active.id);
    }
  }, [location]);
  return (
    <>
      <div className="sidebar-top">
       <div className="sidebar-logo-box">
       <img src={logo} className="sidebar-logo"/>
       </div>
      </div>
      <section className="sidebar">
       
        <ul className="sidebar-menu">
        <div className="">
          {/* <img src={hide_sidebar} className="hide_side"/> */}
        </div>
          {sidebarMenu?.map((list) => {
            return (
              <Link to={`${list.link}`}>
                <li
                  className={`${
                    list.id === activeMenu ? "active" : ""
                  } sidebar-list`}
                  title={list?.navItem}
                  onClick={() => setActiveMenu(list.id)}
                >
                  <div className="side-menu-box">
                  <img src={list.img} className="sidebar-icon-img" />
                  </div>
                 {/* <span> {list?.navItem}</span> */}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="setting">
            <img src={settings}/>
        </div>
      </section>
      
    </>
  );
}

export default Sidebar;
