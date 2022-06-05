import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  title: string;
  type: string;
  href?: string;
  onClick?: MouseEventHandler
};

const Button: FC<ButtonProps> = ({ title, type, href, onClick }) => {
  const styles = classNames(
    "d-inline-block btn mx-1",
    `btn-${type}`
  );

  return (
    href ? 
    <Link 
      to={href}
      className={styles}
      onClick={onClick}
    >
      { title }
    </Link> :
    <button 
      type="button" 
      className={styles}
      onClick={onClick}
    >
      { title }
    </button>
  );
}

export { Button, type ButtonProps };
