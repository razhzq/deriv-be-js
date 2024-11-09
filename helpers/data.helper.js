function randomizePosition(asset, price) {
    // Set ranges and options
    const minEntryPrice = parseFloat(price) * 0.8;  // Lower bound for USD/EUR
    const maxEntryPrice = parseFloat(price) * 1.2;  // Upper bound for USD/EUR
    const minLotSize = 0.01;       // Minimum lot size
    const maxLotSize = 200.0;        // Maximum lot size
    const leverageOptions = [50];  // Fixed leverage option
    const minStopLossDistance = 0.01; // Minimum stop-loss distance in EUR
    const maxStopLossDistance = 0.02; // Maximum stop-loss distance in EUR
    const minTakeProfitDistance = 0.01; // Minimum take-profit distance in EUR
    const maxTakeProfitDistance = 0.02; // Maximum take-profit distance in EUR
    const tradeDirections = ['buy', 'sell'];  // Possible trade directions

    // Helper function to get a random float between min and max
    const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(4));

    // Helper function to get a random integer between min and max
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Helper function to pick a random item from an array
    const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];

    // Generate position details
    const entryPrice = randomFloat(minEntryPrice, maxEntryPrice);
    const currentPrice = randomFloat(entryPrice - 0.01, entryPrice + 0.01);  // Current price close to entry price
    const leverage = randomChoice(leverageOptions);

    // Generate lot size
    const lotSize = randomFloat(minLotSize, maxLotSize);

    // Generate stop-loss and take-profit levels
    const stopLoss = parseFloat((entryPrice - randomFloat(minStopLossDistance, maxStopLossDistance)).toFixed(4));
    const takeProfit = parseFloat((entryPrice + randomFloat(minTakeProfitDistance, maxTakeProfitDistance)).toFixed(4));

    // Generate trade direction (buy or sell)
    const tradeDirection = randomChoice(tradeDirections);

    // Calculate pips (difference in price, scaled to pips)
    const pips = Math.round((currentPrice - entryPrice) * 10000); // Convert difference to pips

    // Generate order number and date/time
    const orderNo = `ORD${randomInt(1000, 9999)}`;
    const date = "2024-11-09"; // Static date
    const time = "14:23:00"; // Static time

    // Return all details in the desired format
    return {
        "user_id": "user123",
        "currency": asset,
        "leverage": leverage,
        "opening_price": entryPrice,
        "current_price": currentPrice,
        "order_no": orderNo,
        "date": date,
        "time": time,
        "pips": pips,
        "stop_loss": stopLoss,
        "take_profit": takeProfit,
        "lot_size": lotSize,
        "trade_direction": tradeDirection // Added direction
    };
}

// Generate 1000 randomized positions and store them in an array
module.exports.getRandomizedDummyData = (asset, price) => {
    const positionsArray = Array.from({ length: 1000 }, () => randomizePosition(asset, price));

    const aggregatedPositions = {
        buyExposure: 0, // Track total exposure from buys
        sellExposure: 0, // Track total exposure from sells
        totalProfitLoss: 0 // Track the total profit/loss
    };
    
    positionsArray.forEach(position => {
      const { currency, leverage, opening_price, current_price, pips, lot_size, trade_direction } = position;
    
      // Calculate profit/loss per position (lotSize * difference in price * pips * leverage)
      const profitLoss = (current_price - opening_price) * lot_size * leverage * 10000; // 10000 for pip conversion
    
      // Adjust exposure based on trade direction
      const exposureAdjustment = lot_size * leverage;
      if (trade_direction === 'buy') {
        aggregatedPositions.buyExposure += exposureAdjustment; // Add to buy exposure
      } else if (trade_direction === 'sell') {
        aggregatedPositions.sellExposure += exposureAdjustment; // Add to sell exposure
      }
    
      // Aggregate total profit/loss
      aggregatedPositions.totalProfitLoss += profitLoss;
    });
    
    // Calculate net exposure (the risk the broker takes)
    const netExposure = Math.abs(aggregatedPositions.buyExposure - aggregatedPositions.sellExposure);

    return {
        buy_volume_usd: aggregatedPositions.buyExposure.toFixed(2),
        sell_volume_usd: aggregatedPositions.sellExposure.toFixed(2),
        net_exposure: netExposure.toFixed(2)
    }
    
    // console.log("Aggregated Position Summary:");
    // console.log("Buy Exposure:", aggregatedPositions.buyExposure.toFixed(2));
    // console.log("Sell Exposure:", aggregatedPositions.sellExposure.toFixed(2));
    // console.log("Net Exposure (Broker Risk):", netExposure.toFixed(2));
    // console.log("Total Profit/Loss:", aggregatedPositions.totalProfitLoss.toFixed(2));
}

