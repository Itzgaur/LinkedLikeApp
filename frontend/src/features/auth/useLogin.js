import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });

      // queryClient.setQueryData(["authUser"], res.user);
      toast.success("Login successful!");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { login, isPending };
}