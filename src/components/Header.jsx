// components/Header.jsx

import React from "react";

const Header = ({ title, children }) => {
  return (
    <div>
      <div className="header">{title}</div>
      {children}
    </div>
  );
};

export default Header;
