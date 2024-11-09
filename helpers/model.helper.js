const { default: axios } = require("axios")

const BASE_MODEL_URL = "http://localhost:8000"

module.exports.getAssetSentiment = async (asset, timeframe) => {
    const data = await axios.post(BASE_MODEL_URL + "/analyze", {
        currency: asset,
        duration: timeframe ? timeframe : "1d" 
    })
    return data.data;
}
