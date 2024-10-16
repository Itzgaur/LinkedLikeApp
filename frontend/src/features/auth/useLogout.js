import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(`you have logged out`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(`something went wrong while trying to log you out`);
    },
  });

  return { logout, isPending };
}
