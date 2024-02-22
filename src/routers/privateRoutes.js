import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";


const PrivateRoute = ({element}) => {
    const isAuthenticated = useSelector((state) => state.user.accessToken);
  
    return isAuthenticated ? (
        element
    ) : (
      <Navigate to="/" replace />
    );
  };

export default PrivateRoute;
