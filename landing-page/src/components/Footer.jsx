import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>MOV Stay – Smart Student Accommodation Platform &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
