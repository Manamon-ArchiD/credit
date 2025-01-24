import { Request, Response } from "express";
import UserPersistance from "../persistance/TransactionPersistance";
import { Database } from "../persistance/Database";
import Transaction from "../model/Transaction";
import TransactionPersistance from "../persistance/TransactionPersistance";

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

    private computeUserBalance(transactions: Transaction[]) {
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
        try {
            const persistence = new TransactionPersistance(Database.get())
            const transaction: Transaction = {
                ...req.body,
                date: Date.now().toString()
            }
            await persistence.insert(transaction)

            // compute new balance
            const transactions = await persistence.getByUser(transaction.userId)
            const newBalance = this.computeUserBalance(transactions)

            res.status(200).json({ userId: transaction.userId, newBalance: newBalance})
        }
        catch(err) {
            console.error(err)
            res.status(500).json({ message: 'Une erreur est survenue' })
        }
    }

    async getTransactionHistory(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userTransactions = transactions.filter(transaction => transaction.userId === userId);

            res.status(200).json(userTransactions);
        } catch (error) {
            res.status(500).json({ message: 'Une erreur est survenue' });
        }
    }
}

export default IndexController;
