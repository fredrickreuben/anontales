import request from 'axios'

export const getInstance = (url: string, auth: string) => request.create({
    baseURL: url,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json', 'Authorization': auth }
});