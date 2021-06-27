// const backend = {
//   url_path: "http://localhost:5000",
//   register: "/register",
//   verification: "/register/verify",
//   signin: "/signin",
//   payment: "/razorpay",
// };

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default instance;
