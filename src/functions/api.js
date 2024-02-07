import axios from "axios";
const isProduction = import.meta.env.VITE_PRODUCTION;

console.log(isProduction);

// headers: {
//     'Content-Type': 'application/json', // Example header, you can add more as needed
//     'Authorization': 'Bearer yourAccessToken' // Example authorization header
//   }

const mainApi = async (method, path, data, headers) => {
  try {
    let fainlPath = path.startsWith("/") ? path.slice(1) : path;
    let auth = localStorage.token ? { Authorization: localStorage.token } : {};

    let baseUrl = isProduction==='true'  ? 'http://localhost:2500/' : 'https://engager-g262.onrender.com/'

    const url = `${baseUrl}${fainlPath}`;

    const response = await axios({
      method,
      url,
      data,
      headers: { ...headers, ...auth },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const get = async (path, data = {}, headers) => await mainApi("GET", path, data, headers);

const post = async (path, data = {}, headers) => await mainApi("POST", path, data, headers);

const put = async (path, data = {}, headers) => await mainApi("PUT", path, data, headers);


const del = async (path, data = {}, headers) => await mainApi("DELETE", path, data, headers);


// import the file in ur componnt

// import { api } from "./api";

//to get all users u need to send path(for exsple:"/user")
// and u get the users in the res (for exsple:console.log(res))
// api.get("/user", headers).then((res) => res);
// ----------------------------------------------------------------
// to post a new user u need to send path(for exsple:"/user")and send user data on (look in exsmple down)
// api.post("/user",
//   (data = {
//     name: "test",
//     email: "<EMAIL>",
//     password: "<PASSWORD>",
//   }),
//   headers
// ).then((res) => res.data);
// ----------------------------------------------------------------
// to update a user u need to send path(for exsple:"/user/id")
// and to send details that u want to update (look in exsmple down)
// api.put("/user/id",
//   (data = {
//     name: "test",
//     email: "<EMAIL>",
//     password: "<PASSWORD>",
//   }),
//   headers
// ).then((res) => res.data);
// ----------------------------------------------------------------
//to delete a user u need to send path and data(for exsple:_id)
// api.delete("/user/id",
//   (data = {
//     _id: "uigheiuty489958y45hj",
//   }),
//   headers
// ).then((res) => res.data);

export default { get, post, del, put };
