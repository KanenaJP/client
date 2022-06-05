import React, { FC } from "react";
import { Button } from "../button";

const AccessDenied: FC = () => {
  return (
    <div className="d-flex flex-row align-items-center">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <span className="display-1 d-block">Операция невозможна</span>
                    <div className="mb-4 lead">Эта страница Вам недоступна</div>
                    <Button title="На главную" type="primary" href="/"/>
                </div>
            </div>
        </div>
    </div>
  )
};

export { AccessDenied }
