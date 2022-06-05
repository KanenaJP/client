import React, { FC } from "react";

interface ButtonsGroupProps {
  children: React.ReactNode
};

const ButtonsGroup: FC<ButtonsGroupProps> = ({ children }) => {
  return (
    <div className="col-md-3 text-end">
      { children }
    </div>
  );
}

export { ButtonsGroup, type ButtonsGroupProps };
