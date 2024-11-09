// Define the model
const model = {
    recommendation: 'buy' // or 'sell'
};

// Function to calculate the effective price after adding brokerage fee for buying
function applyBrokerageFeeOnBuy(price) {
    return price * (1 + 0.02); // Add 2% to the price
}

// Function to calculate the effective price after deducting brokerage fee for selling
function applyBrokerageFeeOnSell(price) {
    return price * (1 - 0.02); // Deduct 2% from the price
}

// Function for broker buying
function brokerBuy(clientPrice) {
    const buyPrice = Math.random() < 0.5 ? clientPrice * 1.01 : clientPrice * 0.99; // Buy at either 1% more or 1% less than original price
    console.log(`Broker buys at ${buyPrice.toFixed(2)} (Client original price: ${clientPrice})`);
    return buyPrice;
}

// Function for broker selling
function brokerSell(clientPrice) {
    const sellPrice = Math.random() < 0.5 ? clientPrice * 1.01 : clientPrice * 0.99; // Sell at either 1% more or 1% less than original price
    console.log(`Broker sells at ${sellPrice.toFixed(2)} (Client original price: ${clientPrice})`);
    return sellPrice;
}

// Main function to execute the transaction based on client action
function executeTransaction(clientAction, clientPrice) {
    if (model.recommendation === 'buy') {
        if (clientAction === 'buy') {
            const effectivePrice = applyBrokerageFeeOnBuy(clientPrice); // Calculate effective price after fee for buying
            console.log(`Client buys at ${clientPrice}, effective price (with fee): ${effectivePrice.toFixed(2)}`);
            brokerBuy(clientPrice);
        } else if (clientAction === 'sell') {
            console.log(`Client sells at ${clientPrice}`);
            console.log('Model recommends buying, broker does not act on client sell.');
        }
    } else if (model.recommendation === 'sell') {
        if (clientAction === 'buy') {
            console.log(`Client buys at ${clientPrice}`);
            console.log('Model recommends selling, broker does not act on client buy.');
        } else if (clientAction === 'sell') {
            const effectivePrice = applyBrokerageFeeOnSell(clientPrice); // Calculate effective price after fee for selling
            console.log(`Client sells at ${clientPrice}, effective price (after fee): ${effectivePrice.toFixed(2)}`);
            brokerSell(clientPrice);
        }
    } else {
        console.log('Invalid model recommendation.');
    }
}

// Example usage
const clientPrice = 100; // Price at which the client buys or sells

// Test cases
executeTransaction('buy', clientPrice); // Client buys
executeTransaction('sell', clientPrice); // Client sells

// Change model to 'sell' and test again
model.recommendation = 'sell';
executeTransaction('sell', clientPrice); // Client sells
executeTransaction('buy', clientPrice); // Client buys