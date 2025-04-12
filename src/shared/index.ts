import { DefaultApi } from "../api/apis/DefaultApi";
import { Configuration } from "../api/runtime";


export const getApiUrl = () => {
    return localStorage.getItem('apiUrl') || 'http://localhost:11451'
}

export const getApiKey = () => {
    return localStorage.getItem('apiKey') || ''
}

const initApiConfig = (apiUrl : string, apiKey : string) => {
    return new DefaultApi(new Configuration({
        basePath: apiUrl,
        apiKey: apiKey
    }))
} 

export let api = initApiConfig(getApiUrl(), getApiKey())

export const initApi = (baseUrl : string, apiKey : string) => {
    api = initApiConfig(baseUrl, apiKey)
}

export const getMetricsFreshTime = () => {
    const local = localStorage.getItem('metricsFreshTime')
    if (local) {
        const parsed = parseInt(local)
        return isNaN(parsed) || parsed < 500 ? 1000 : parsed
    }
    return 1000
}

