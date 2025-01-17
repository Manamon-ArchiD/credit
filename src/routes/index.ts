import { Router } from 'express';
import IndexController from '../controllers/index';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app) {
  app.get('/credit/:userId', indexController.getCreditBalance.bind(indexController));
  app.post('/credit/update', indexController.updateCreditBalance.bind(indexController));
  app.get('/credit/:userId/transactions', indexController.getTransactionHistory.bind(indexController));
  
  // Additional routes can be added here
}