const axios = require("axios");

function createClient(baseURL) {
    const TOKEN = process.env.API_TOKEN;
    if (!TOKEN) {
    throw new Error("API_TOKEN is missing in environment variables");
  }
  return axios.create({
    baseURL,
    headers: {
      Authorization:  `Bearer ${TOKEN}`// change if Authorization Bearer required
    }
  });
}

module.exports = createClient;
