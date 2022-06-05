import React, { FC } from "react";

interface NavbarProps {
  children: React.ReactNode
};

const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      { children }
    </ul>
  );
}

export { Navbar, type NavbarProps };
