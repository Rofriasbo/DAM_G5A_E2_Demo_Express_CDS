//Import libraries

const cds = require("@sap/cds");
const { GetAllPricesHistory, GetPriceHistoryById,AddOnePricesHistory,DeletePriceHistoryById, UpdatePriceHistoryById } = require("../services/inv-pricehistory-services");


//Principal structure controller class

class InversionsClass extends cds.ApplicationService {
  //Constructor
  async init() {
    //Call method handler the parent constructor

    // GET ALL
    this.on("getall", async (req) => {
      // call the service method and return the result to route.
      return GetAllPricesHistory(req);
    });
    //If not execute any method, the system will return the defsult CSV data model.
    //gets local data and returns the metadata with the route localhost:3333/api/inv/priceshistory
    //Note: the file name with extension .csv must called equal than the data model;
    //otherwhise, it will not be found

    // GET by query param (id=...)
    this.on("getitem", async (req) => {
      const id = req.data?.ID;
      console.log("🧪 ID recibido:", id); // <--- aquí el log
      if (!id) throw new Error("Falta el parámetro ID");
    
      return await GetPriceHistoryById(id);
    });

     // POST pricehistory
     this.on("addOne", async (req) => {
      // call the service method and return the result to route.
      return AddOnePricesHistory(req);
    });

    this.on("deleteItem", async (req) => {
      // call the service method and return the result to route.
      return DeletePriceHistoryById(req);
    });

    this.on("updateItem", async (req) => {
      return await UpdatePriceHistoryById({ data: req.data.prices });
    });
    
    return await super.init();
  }
  
}

// Export the controller class
module.exports = InversionsClass;
