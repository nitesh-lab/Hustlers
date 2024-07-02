
import { axiosInstance } from "../axiosInstance"; // Assuming it's configured elsewhere

export async function getPosts(id: string, time: number) {
  const signal = new AbortController().signal;

  try {
    const res = await axiosInstance.post("api/user/getPosts", { uid: id, time }, { signal });
   

      return {data:res.data.posts,time:res.data.time}
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Handle errors appropriately (e.g., return an empty array or display an error message to the user)
  }
}
