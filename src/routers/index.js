import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/SignUp";
import ContactBook from "../pages/ContactsBook";
import PrivateRoute from "./privateRoutes";

export default function index() {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/sign-up"} element={<Signup />} />
      <Route
        path="/contact"
        element={<PrivateRoute element={<ContactBook />}></PrivateRoute>}
      />
    </Routes>
  );
}
