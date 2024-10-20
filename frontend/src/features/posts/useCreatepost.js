import { useMutation } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function useCreatePost() {
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (res) => {
      toast.success("Post created successfully");
    },
    onError: (err) => {
      toast.error("Error creating post");
    },
  });

  return { createPost, isPending };
}
