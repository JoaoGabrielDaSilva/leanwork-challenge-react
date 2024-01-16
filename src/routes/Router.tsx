import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserRegister } from "../pages/UserRegister";
import { UserList } from "../pages/UserList";
import { UserEdit } from "../pages/UserEdit";

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
