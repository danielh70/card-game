import axios from "axios";
import { getToken } from "./helper";

const SERVER_URL = process.env.NODE_ENV === 'production' ? "" : "http://localhost:3000";
// const APIURL = process.env.NODE_ENV === 'production' ? "/" : "http://localhost:3000/";

const register = userInfo => axios.post(`${SERVER_URL}/register`, userInfo);
const login = userInfo => axios.post(`${SERVER_URL}/login`, userInfo);
const getSecret = uid =>
  axios.get(`${SERVER_URL}/secret/${uid}`, {
    headers: { authorization: `Bearer ${getToken()}` }
  });

const api = {
  register,
  login,
  getSecret
};
export default api;