import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout: FC = () => {
    localStorage.clear();
    return <Navigate to="/login"></Navigate>;
};

export { Logout };
