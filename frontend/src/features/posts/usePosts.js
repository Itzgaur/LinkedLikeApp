import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiPost";

export function usePosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    refetchInterval: 3 * 60 * 1000,
  });

  return { posts, isLoading };
}
