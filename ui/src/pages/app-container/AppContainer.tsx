import React from "react";
import { Outlet } from "react-router-dom";
import "./AppContainer.styles.css";

const Layout: React.FC<{}> = () => {
  return (
    <div className="layout__container">
      <Outlet />
      <footer className="footer">Made with ❤️ by Santiago Múnera.</footer>
    </div>
  );
};

export default Layout;
