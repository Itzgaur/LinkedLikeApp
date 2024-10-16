import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NetworkPage from "./pages/NetworkPage";
import AppLayout from "./ui/AppLayout";

import { Routes, Route, Navigate } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";

import { useUser } from "./features/auth/useUser";

function App() {
  const { authUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/home" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/network" element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/home"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
