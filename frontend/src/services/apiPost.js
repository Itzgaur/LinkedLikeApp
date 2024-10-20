import { httpClient } from "../lib/axios";

export async function createPost(data) {
  try {
    const response = await httpClient.post("/posts/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
  }
}
