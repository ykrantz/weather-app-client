// npm i axios
import axios from "axios";
// import env from "react-dotenv";

// const apiServer = "http://localhost:3020/api/";
const apiServer = "https://weather-app-ykrantz.herokuapp.com/api/";

// the server port
// if (process.env.NODE_ENV !== "prd") {
//   console.log(env.API_URL);
//   apiServer = env.API_URL;
// }

const instance = axios.create({
  baseURL: apiServer,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     // grab tokrn from localstorage, same name between all frontend == accToken
//     const token = localStorage.LSaccessToken;
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
