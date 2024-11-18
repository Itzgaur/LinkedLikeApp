import toast from "react-hot-toast";
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
    console.log(error);
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
    else throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const response = await httpClient.get("/posts");
    return response.data.data.posts;
  } catch (error) {
    toast.error(`cannot get all posts`);
    return null;
  }
}

export async function deletePostById(postId) {
  try {
    const response = await httpClient.delete(`/posts//deletePost/${postId}`);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
    else throw new Error(`Error in deleting`);
  }
}

export async function likePost(postId) {
  try {
    const response = await httpClient.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
    else throw new Error(`Error in deleting`);
  }
}

export async function addNewComment(postId, newComment) {
  try {
    const response = await httpClient.post(`/posts/${postId}/comment`, { content: newComment });
    return response;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) throw new Error(error.response?.data?.message);
    else throw new Error(`Error in creating comment`);
  }
}
