import axios from "axios";

export const axiosInstace = axios.create({
  baseURL: "https://different-fox-tuxedo.cyclic.app/backend/",
});
