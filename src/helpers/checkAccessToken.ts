import axios from "axios"
import { fetchBaseUrl } from "../config"

export const checkAccessToken = async () => {
  let result;
  await axios
    .delete(`${fetchBaseUrl}/users/delete/-1`, { headers: { Authorization: `Bearer ${localStorage.getItem("gl_access_token")}` } })
    .then(() => result = true)
    .catch(() => result = false);

  return result;
}