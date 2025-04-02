const ztpriceshistory = require('../models/mongodb/ztpriceshistory');

// Get all, Get One, and Get Some Prices history
async function GetAllPricesHistory(req){
  try{
    const pricesHistory = await ztpriceshistory.find().lean();
    return pricesHistory;
  }catch(error){
    return error;
  } finally {

  }
};

// Post Add One and Some Prices History
async function AddOnePriceHistory(req){
    try{
      const newPrice = req.prices;
      let pricesHistory;
      pricesHistory = await ztpriceshistory.insertMany([newPrice], {order: true});
      return pricesHistory;
    }catch(error){
      return error;
    } finally {
  
    }
  };

// Delete One Price History
async function DeleteOnePriceHistory(req){
    try{
      const id = req.params.id;
      let pricesHistory;
      pricesHistory = await ztpriceshistory.findByIdAndDelete(id);
      return pricesHistory;
    }catch(error){
      return error;
    } finally {
  
    }
  };

  // Put One Price History
  async function PutOnePriceHistory(req){
    try{
      const id = req.params.id;
      const newPrice = req.body;
      let pricesHistory;
      pricesHistory = await ztpriceshistory.findByIdAndUpdate(id, newPrice, {new: true});
      return pricesHistory;
    }catch(error){
      return error;
    } finally {
  
    }
  };

module.exports = { GetAllPricesHistory, AddOnePriceHistory, DeleteOnePriceHistory, PutOnePriceHistory };