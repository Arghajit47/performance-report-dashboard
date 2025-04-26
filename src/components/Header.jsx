// components/Header.jsx

import React from "react";

const Header = ({ title = "Performance Audit Dashboard", children }) => {
  return (
    <div>
      <div className="header">{title}</div>
      {children}
    </div>
  );
};

export default Header;
