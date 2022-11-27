import axios from "./index";

class AuthApi {

  static Login = (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', "password");
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };
    return axios.post('connect/token', params, {
        headers: headers
    });
  };

  // don't forget to add the register and logout methods
}

export default AuthApi;