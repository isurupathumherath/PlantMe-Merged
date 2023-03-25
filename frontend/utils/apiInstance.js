import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "https://plantme.onrender.com";

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    config.baseURL = url;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
