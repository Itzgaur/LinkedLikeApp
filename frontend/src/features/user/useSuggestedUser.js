import { useQuery } from "@tanstack/react-query";
import { getRecommendedUser } from "../../services/apiUser";

export default function useSuggestedUser() {
  const { data: suggestConnections, isLoading: isFetchingSuggestedUser } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: getRecommendedUser,
  });

  return { suggestConnections, isFetchingSuggestedUser };
}
