import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchCurrentUser,
  });

  return { authUser, isLoading };
}
