import { DefaultApi } from "../apis/DefaultApi";
import { Configuration } from "../runtime";

export let api = new DefaultApi();

export const initApi = (baseUrl : string) => {
    api = new DefaultApi(new Configuration({
        basePath: baseUrl
    }));
}