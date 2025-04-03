const ztpricehistory = require('../models/mongoDB/ztpricehistory');
const boom = require('@hapi/boom');

async function GetAllPricesHistory(req){
    try{
        let pricehistory;
        pricehistory = await ztpricehistory.find().lean();
        console.log(pricehistory);
        return(pricehistory);
    }catch(error){
        return error;
    } finally {

    }
}
async function GetPriceHistoryById(id) {
    try {
      const result = await ztpricehistory.findOne({ ID: id }).lean();
  
      return result;
    } catch (error) {
      throw boom.internal(error);
    }
  }

// POST (ADD) Price History Record
async function AddOnePricesHistory(req) {
  try {
    const newPrices = req.req.body.prices;
    let pricesHistory;
    pricesHistory = await ztpricehistory.insertMany(newPrices,{
      order: true,
    });
    return JSON.parse(JSON.stringify(pricesHistory));
  }catch (error){
    throw error;
  } finally {
  }
}

//PUT 
async function UpdatePriceHistoryById(req) {
  try {
    const { ID, DATE, OPEN, HIGH, LOW, CLOSE, VOLUME } = req.data;
    if (!ID) throw boom.badRequest("Falta el parámetro ID");

    const updated = await ztpricehistory.findOneAndUpdate(
      { ID },
      { DATE, OPEN, HIGH, LOW, CLOSE, VOLUME },
      { new: true } // devuelve el documento actualizado
    ).lean();

    if (!updated) throw boom.notFound(`No se encontró el registro con ID=${ID}`);

    return {
      message: "Registro actualizado correctamente",
      updated
    };

  } catch (error) {
    if (error.isBoom) throw error;
    throw boom.internal("Error al actualizar el historial de precios", error);
  }
}
// DELETE Price History Record

async function DeletePriceHistoryById(req) {
  try {
    const { ID } = req.data;
    if (!ID) throw boom.badRequest("Falta el parámetro ID");

    const deleted = await ztpricehistory.findOneAndDelete({ ID }).lean();
    if (!deleted) throw boom.notFound(`No se encontró el registro con ID=${ID}`);

    return {
      message: "Registro eliminado correctamente",
      deleted
    };
  }catch (error){
    throw error;
  } finally {
  }
}

  

module.exports = {
  GetAllPricesHistory,
  GetPriceHistoryById,
  AddOnePricesHistory,
  DeletePriceHistoryById,
  UpdatePriceHistoryById
};