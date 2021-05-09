import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './header.scss';

const Header = () => {
  return (
    // <div className="header-app">
    <div style={{ zIndex: '1201' }}>
      <Navbar color="primary">
        <NavbarBrand style={{ color: '#fff', paddingLeft: '1rem' }}>Social Media Dashboard</NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;