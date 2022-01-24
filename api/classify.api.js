const axios = require("axios");
const URL = "https://classify-web.herokuapp.com/api";

function encodeData(data, key) {
    return axios.post(`${URL}/encrypt`, {
        data,
        key,
    });
}

function decodeData(data, key) {
    return axios.post(`${URL}/decrypt`, {
        data,
        key,
    });
}

function keygen(length) {
    return axios.get(`${URL}/keygen?length=${length}`);
}

module.exports = {
    encodeData,
    decodeData,
    keygen,
};
