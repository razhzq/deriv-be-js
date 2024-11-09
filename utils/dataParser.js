const { getAssetSentiment } = require("../helpers/model.helper");


module.exports.parseSymbolData = async (data) => {
    const temp = [];
    const arr = [];

    // Collecting the display names
    data.map((item) => temp.push(item.display_name));

    // Using Promise.all to handle the async map
    await Promise.all(temp.map(async (item) => {
        const assetSentimentData = await getAssetSentiment(item);
        arr.push(assetSentimentData);
    }));

    return arr;
}


