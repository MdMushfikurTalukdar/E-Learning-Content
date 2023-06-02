import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import baseApi, { Private_api } from "./baseApi";
axios.defaults.withCredentials = true;

const useServer = () => {
  
  const uid = localStorage.getItem("uid");

  const [User_Info, setUserInfo] = useState("");
  const getUserInfo = async () => {
    const data = await Private_api().get(`user/${uid}`);
    setUserInfo(data.data.data);
  };
  useEffect(() => {
   
    getUserInfo();
  }, []);

  const [TokenInfo, setTokenInfo] = useState("");
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      var decodedToken = jwt_decode(token);
      setTokenInfo(decodedToken);
    }
  }, []);

  return {
    User_Info,
    TokenInfo,
    setTokenInfo,
  };
};
export default useServer;
