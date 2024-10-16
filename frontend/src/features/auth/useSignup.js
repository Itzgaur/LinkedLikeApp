import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Signup successful! Please login.");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
  // console.log(userDetails);

  return {
    signup,
    isPending,
    isError,
  };
}
