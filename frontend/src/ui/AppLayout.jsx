import NavBar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import LoadingPage from "../pages/LoadingPage";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
