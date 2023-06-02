import axios from "axios";
import Cookies from "js-cookie";
const BaseApi ="http://localhost:5000/api/v1/";
export default BaseApi;

export const ImagePath = "http://localhost:5000";


export const public_api = () => {
  return axios.create({
    baseURL: "http://localhost:5000/api/v1/",
    timeout: 10000,
  });
};

export const Private_api = () => {
  return axios.create({
    baseURL:"http://localhost:5000/api/v1/",
 
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};
