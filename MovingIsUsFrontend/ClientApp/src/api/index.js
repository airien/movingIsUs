import Axios from "axios";
import { API_SERVER } from "../config/constants";

function getUserToken() {
    let user = localStorage.getItem("user")
    user = JSON.parse(user);
    console.log("found user", user)

    return user.token
}

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: {
       "Content-Type": "application/json",
       "Authorization": "Bearer " + getUserToken()
     },
});

axios.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;