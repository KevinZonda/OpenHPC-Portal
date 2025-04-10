import { DefaultApi } from "../api/apis/DefaultApi";
import { Configuration } from "../api/runtime";

export let api = new DefaultApi(new Configuration({
    basePath: "http://localhost:11451"
}));

export const initApi = (baseUrl : string) => {
    api = new DefaultApi(new Configuration({
        basePath: baseUrl
    }));
}