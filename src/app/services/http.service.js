import axios from "axios";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// http.interceptors.request.use(function (error) {
//     return Promise.reject(error);
// })

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};
export default httpService;
