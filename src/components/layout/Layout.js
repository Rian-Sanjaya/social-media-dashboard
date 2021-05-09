import React from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import MainContent from './mainContent/MainContent';

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main
        style={{
          marginLeft: '240px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            padding: '24px',
            margin: '16px',
            background: 'rgb(255, 255, 255)',
            borderRadius: '8px',
          }}
        >
          <MainContent />
        </div>
      </main>
    </div>
  );
};

export default Layout;