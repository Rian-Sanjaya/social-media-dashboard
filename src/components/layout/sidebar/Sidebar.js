import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '70px',
        height: '100%',
        width: '240px',
        background: '#fff',
        overflowY: 'auto',
        zIndex: '1000',
      }}
    >
      <ul style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        <li className="sidebar-nav"><NavLink className="anchor" to={"/"}>Home</NavLink></li>
        <li className="sidebar-nav"><NavLink className="anchor" to={"/users"}>Users</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;