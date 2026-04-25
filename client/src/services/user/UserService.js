import { BACKEND_SERVER_URL } from "@/AppConfig";
import Axios from "../apiClient";

export const refreshTokenApi = (payload) => {
  return Axios.post(BACKEND_SERVER_URL + "/api/v1/users/refreshToken", payload);
};