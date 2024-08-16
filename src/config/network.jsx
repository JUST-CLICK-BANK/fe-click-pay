import axios from "axios";
export const api = async (url,method, body,params) => {
    const res = await axios({
        url,
        method,
        baseURL:"http://localhost:8080",
        params: params,
        headers:{ 'Content-Type': 'multipart/form-data',},
    });
    return res;
};