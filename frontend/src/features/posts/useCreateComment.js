import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewComment, likePost as likePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: addNewComment,
    onSuccess: (res) => {
      console.log(res);
      toast.success(`Comment added successfully`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error liking post: "${err.message}"`);
    },
  });
  return { createComment, isCreatingComment };
}
