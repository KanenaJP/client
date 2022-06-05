import classNames from 'classnames';
import React, { FC } from 'react'

interface InputProps {
  id: string;
  type: string;
  title: string;
  required?: boolean;
  name?: string;
}
const Input: FC<InputProps> = ({ id, type, title, required, name }) => {
  return (
    <div className={classNames( type === "radio" ? "form-check form-check-inline mb-0 me-4" : "col-md-6 mb-4" )}>
      <div className="form-outline">
        <label className={classNames( type === "radio" ? "form-check-label" : "form-label" )} htmlFor={id}>
          { title }
        </label>
        <input
          type={type}
          value={type === "radio" ? `${id}${title}` : undefined}
          id={id}
          name={name ?? id}
          required={required ?? false}
          className={classNames(type === "radio" ? "form-check-input" : "form-control form-control-lg")}
        />
      </div>
    </div>
  )
}

export { Input, type InputProps }
