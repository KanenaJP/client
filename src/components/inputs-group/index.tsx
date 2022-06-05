import React, { FC } from 'react'

interface InputsGroupProps {
  children: React.ReactNode;
  title?: string;
}

const InputsGroup: FC<InputsGroupProps> = ({ children, title }) => {
  return (
    <fieldset className="row">
      {
        title ?
          <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
            <h6 className="mb-0 me-4">{ title }</h6>
            
            { children }
          </div> :
          children 
      }
    </fieldset>
  )
}

export { InputsGroup, type InputsGroupProps }
