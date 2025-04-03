using { inv as myinv } from '../models/inv-inversions';

@impl: 'src/api/controllers/inv-inversions-controller.js'
service PricesHistoryRouter @(path : '/api/inv') {
  @readonly: false
  entity priceshistory as projection on myinv.priceshistory;


  @Core.Description: 'GET all prices history'
  @path: 'getall'
  function getall() returns array of priceshistory;

  @Core.Description: 'GET price history by ID'
  @path: 'getitem'
  function getitem(ID: Integer) returns priceshistory;

  @Core.Description: 'AddOne pricehistory item'
  @path: 'addOne'
  action addOne(prices: priceshistory) returns priceshistory;

  @Core.Description: 'DELETE pricehistory by ID'
  @path: 'deleteItem'
  action deleteItem(ID: Integer) returns priceshistory;

  @Core.Description: 'UPDATE pricehistory by ID'
  @path: 'updateItem'
  action updateItem(prices: priceshistory) returns priceshistory;
}
