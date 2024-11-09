const { parseSymbolData } = require("../utils/dataParser");

// Example usage
const app_id = '16929';


module.exports.getForexSymbols = async () => {
    return new Promise((resolve, reject) => {
        // Create WebSocket connection
        const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

        // Event listener for when the connection opens
        ws.onopen = () => {
            console.log('Connected to WebSocket');
            
            // Define the payload to send
            const payload = {
                active_symbols: "brief",
                product_type: "basic"
            };

            // Send the payload as a JSON string
            ws.send(JSON.stringify(payload));
            console.log('Sent payload:', payload);
        };

        // Event listener for receiving messages from the server
        ws.onmessage = async (event) => {
            try {
                const response = JSON.parse(event.data);
                const forexArr = response.active_symbols;
                const forexResp = forexArr.filter((item) => item.market == 'forex' && item.submarket == 'major_pairs');
                let forexArrSymbol = await parseSymbolData(forexResp);
                resolve(forexArrSymbol); // Resolve the promise with the result
            } catch (err) {
                reject(err); // Reject the promise if there is an error in parsing
            }
        };

        // Event listener for when the connection is closed
        ws.onclose = (event) => {
            console.log('WebSocket connection closed');
        };

        // Event listener for errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            reject(error); // Reject if there is a WebSocket error
        };
    });
};


module.exports.getAssetPrice = async () => {
     // Create WebSocket connection
     const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

     // Event listener for when the connection opens
     ws.onopen = () => {
         console.log('Connected to WebSocket');
         
         // Define the payload to send
         const payload = {
                exchange_rates: 1,
                base_currency: base_asset,
                target_currency: target_currency
         };
 
         // Send the payload as a JSON string
         ws.send(JSON.stringify(payload));
         console.log('Sent payload:', payload);
     };
 
     // Event listener for receiving messages from the server
     ws.onmessage = (event) => {
         
         // Optionally, parse the response if it's JSON
         const response = JSON.parse(event.data);
         const forexArr = response.active_symbols;
         //console.log(forexArr[0]);
         const forexResp = forexArr.filter((item) => item.market == 'forex' && item.submarket == 'major_pairs');
         //const forex = response.map((item) => item.subgroup_display_name === "Forex");
         parseSymbolData(forexResp);
         ws.close()
     };
 
     // Event listener for when the connection is closed
     ws.onclose = (event) => {
         console.log('WebSocket connection closed');
     };
 
     // Event listener for errors
     ws.onerror = (error) => {
         console.error('WebSocket error:', error);
     };
}