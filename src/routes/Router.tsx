import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserRegister } from "../pages/user-register";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/user-register" replace />} />
        <Route path="/user-register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
};
