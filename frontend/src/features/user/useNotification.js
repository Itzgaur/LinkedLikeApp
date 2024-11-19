import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotification } from "../../services/apiUser";

export default function useNotifications() {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);
  const { data: userNotification, isLoading: isFetchingNotification } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotification,
    enabled: !!authUser,
  });

  return { userNotification, isFetchingNotification };
}
