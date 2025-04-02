const express = require('express');
const router = express.Router();
const InvestmentsController = require('../controllers/inv-investments-controller');
const { GetAllPricesHistory, AddOnePriceHistory, DeleteOnePriceHistory, PutOnePriceHistory } = require('../services/inv-priceshistory-service');

const investmentsController = new InvestmentsController();
investmentsController.init();

router.post('/addone', async (req, res) => {
  try {
    const newPrice = req.body;
    const updatedPrices = await AddOnePriceHistory(newPrice);
    res.json(updatedPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getall', async (req, res) => {
  try {
    const pricesHistory = await GetAllPricesHistory(req);
    res.json(pricesHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/put/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPrice = await PutOnePriceHistory(req);
    res.json(updatedPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPrice = await DeleteOnePriceHistory(req);
    res.json(deletedPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;