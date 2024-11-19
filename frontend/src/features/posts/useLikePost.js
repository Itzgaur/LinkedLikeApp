import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost as likePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function useLikePost() {
  const queryClient = useQueryClient();

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: likePostApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(`Error liking post: "${err.message}"`);
    },
  });
  return { likePost, isLiking };
}
