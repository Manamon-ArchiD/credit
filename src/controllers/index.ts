import { Request, Response } from "express";
import { Database } from "../persistence/Database";
import Transaction from "../model/Transaction";
import TransactionPersistence from "../persistence/TransactionPersistence";

const transactions = [
    {
      userId: '12345',
      transactionId: 'txn-001',
      date: '2025-01-17T12:34:56Z',
      transactionType: 'purchase',
      amount: 50.0,
    },
    // Ajoutez d'autres transactions ici
  ];

class IndexController {

    private async computeUserBalance(transactions: Transaction[]) {
        let balance = 0
        for(let transaction of transactions) {
            balance += transaction.amount
        }
        return balance
    }

    async getCreditBalance(req: Request, res: Response) {
        const userId = req.params.userId;
        // Logic to retrieve credit balance for the user
        res.json({ userId, balance: 100.0 }); // Example response
    }

    async updateCreditBalance(req: Request, res: Response) {
        // Logic to update credit balance for the user
        res.status(200).json({ userId: req.body.userId, newBalance: 120.0 }); // Example response
    }

    async getTransactionHistory(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const db = Database.get();
            const transactionPersistence = new TransactionPersistence(db);
            const userTransactions = await transactionPersistence.getByUser(userId);

            res.status(200).json(userTransactions);
        } catch (error) {
            res.status(500).json({ message: 'Une erreur est survenue' });
        }
    }
}

export default IndexController;
