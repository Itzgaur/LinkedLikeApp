import NavBar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import LoadingPage from "../pages/LoadingPage";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
