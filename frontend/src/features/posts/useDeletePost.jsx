import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostById as deletePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: delePost, isPending } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(`Post deleted successfully`);
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(`Error deleting post: "${err.message}"`);
    },
  });

  return { delePost, isPending };
}
