import { httpClient } from "../lib/axios";

export async function getRecommendedUser() {
  try {
    const recommendedUsers = await httpClient.get("/users/suggestConnections");
    console.log(recommendedUsers);
    return recommendedUsers.data.data.suggestion;
  } catch (error) {
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
    else throw new Error(`Error in deleting`);
  }
}
