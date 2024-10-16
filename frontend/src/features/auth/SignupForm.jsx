import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { httpClient } from "../../lib/axios.js";
import { useSignup } from "./useSignup.js";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isPending, isError } = useSignup();

  function handleSignUp(e) {
    e.preventDefault();
    signup({ email, name, username, password });
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4 my-6"
    >
      <input
        type="text"
        value={name}
        placeholder="Full name"
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <button
        type="submit"
        className="btn btn-primary w-full text-white"
      >
        {!isPending ? "Submit" : "Loading..."}
      </button>
    </form>
  );
}

export default SignupForm;
