import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// The Layout component now receives props from App.jsx
const Layout = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      {/* Navbar now receives the props it needs to change its links */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      {/* <Outlet /> renders the child routes (Home, About, Contact) here */}
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
};

export default Layout;