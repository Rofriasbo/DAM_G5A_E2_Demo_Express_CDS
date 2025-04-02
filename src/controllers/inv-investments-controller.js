//1.-importacion de las librerias
const express = require('express');

//2.-importar el servicio
const {GetAllPricesHistory, AddOnePriceHistory} = require('../services/inv-priceshistory-service');

//3.- estructura princiapl  de la clas de contorller

class InvestmentsController {
    constructor() {
      this.router = express.Router();
    }
  
    async init (){
  
      this.router.get('/getall', async (req, res) => {
        try {
          const pricesHistory = await GetAllPricesHistory(req);
          res.json(pricesHistory);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  
      this.router.post('/addone', async (req, res) => {
        try {
          const newPrice = req.body;
          const updatedPrices = await AddOnePriceHistory(newPrice);
          res.json(updatedPrices);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  
      this.router.delete('/delete/:id', async (req, res) => {
        try {
          const id = req.params.id;
          const deletedPrice = await DeleteOnePriceHistory(req);
          res.json(deletedPrice);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  
      this.router.put('/put/:id', async (req, res) => {
        try {
          const id = req.params.id;
          const updatedPrice = await PutOnePriceHistory(req);
          res.json(updatedPrice);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
    };
  
    getRouter() {
      return this.router;
    }
  };
module.exports = InvestmentsController;