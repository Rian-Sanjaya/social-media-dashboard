import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '1201',
      }}
    >
      <Navbar color="primary">
        <NavbarBrand style={{ color: '#fff', paddingLeft: '1rem' }}>Social Media Dashboard</NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;