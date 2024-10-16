import { useState } from "react";
import { useLogin } from "./useLogin";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    login({ username, password });
  }
  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <button type="submit" disabled={isPending} className="btn btn-primary w-full">
        {isPending ? "Loading.." : "Login"}
      </button>
    </form>
  );
};
export default LoginForm;
