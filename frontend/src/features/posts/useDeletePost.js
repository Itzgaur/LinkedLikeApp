import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostById as deletePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: delePost, isPending: deletePending } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (res) => {
      console.log(res);
      toast.success(`Post deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error deleting post: "${err.message}"`);
    },
  });

  return { delePost, deletePending };
}
