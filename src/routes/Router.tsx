import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserRegister } from "../pages/user-register";
import { UserList } from "../pages/user-list";
import { UserEdit } from "../pages/user-edit";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/user-register" replace />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-edit/:userCpf" element={<UserEdit />} />
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
};
