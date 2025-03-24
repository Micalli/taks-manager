import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { AuthGuard } from "./Authguard";
import { Tasks } from '../view/pages/Tasks';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
