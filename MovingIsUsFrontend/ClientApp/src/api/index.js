import Axios from "axios";
import { API_SERVER } from "../config/constants";

function getUserToken() {
    let user = localStorage.getItem("user")
    user = JSON.parse(user);
    console.log("found user", user)

    if (user === null) return ""
    return user.token
}

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: {
       "Content-Type": "application/json",
     },
});

axios.interceptors.request.use(
  (config) => {
    let token =  getUserToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
    if(error.response.status === 401) {
        // auto log out
        localStorage.clear();
        window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axios;