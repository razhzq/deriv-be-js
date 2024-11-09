const { getForexSymbols } = require("../helpers/api.helper");
const { getRandomizedDummyData } = require("../helpers/data.helper");



module.exports.getAssetExposure = async (req, res) => {
    const asset = req.body.asset;

    try {


    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            data: [],
            event: "getAssetExposure",
            err: err && err.message 
        })
    }
}

module.exports.getAllSymbols = async (req, res) => {
    try {
        const data = await getForexSymbols();

        res.status(200).send({
            statusCode: 200,
            data: data,
        })


    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            data: [],
            event: "getAllSymbols",
            err: err && err.message 
        })
    }
}


module.exports.getBrokerExposure = async (req, res) => {
    const asset = req.body.asset;
    const price = req.body.price;
    console.log(asset)
    console.log(price)

    try {
        const dummyData = getRandomizedDummyData(asset, price);
        res.status(200).send({
            statusCode: 200,
            data: dummyData
        });
    } catch (err) {
        console.log(err)
        res.status(400).send({
            statusCode: 400,
            data: [],
            event: "getBrokerExposure",
            err: err && err.message 
        })
    }
}