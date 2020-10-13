import Axios from "axios"

export const testApi = (params) => Axios.get(`http://web.juhe.cn:8080/constellation/getAll`, {params}).then((res) => res.data);
