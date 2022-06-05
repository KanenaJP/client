/**
 * <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
 */

import React, { FC, MouseEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";

interface NavbarLinkProps {
  title: string;
  href: string;
  route?: boolean;
};

const NavbarLink: FC<NavbarLinkProps> = ({ title, href, route }) => {
  const styles = "nav-link px-2 link-dark";
  const access_token = localStorage.getItem("access_token");

  const redirectToLoginWhenNotSigned: MouseEventHandler = (e) => {
    if (!access_token) {
      e.preventDefault();
      return <Navigate to="/login" />;
    }
  }

  return (
    <li>
      {
        route ?
          <Link 
            to={href}
            className={styles}
          >
            { title }
          </Link> :
          <a 
            href={href} 
            className={styles}
          >
            { title }
          </a>
      }
    </li> 
  );
}

export { NavbarLink, type NavbarLinkProps };
