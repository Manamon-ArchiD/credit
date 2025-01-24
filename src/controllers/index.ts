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

    private computeUserBalance(transactions: Transaction[]) {
        let balance = 0
        for(let transaction of transactions) {
            balance += (transaction.transactionType === 'purchase' ? -1 : 1) * transaction.amount
        }
        return balance
    }

    async getCreditBalance(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const db = Database.get();
            const transactionPersistence = new TransactionPersistence(db);
            const transactions = await transactionPersistence.getByUser(userId);

            if (transactions.length > 0) {
                const balance = this.computeUserBalance(transactions);
                res.status(200).json({ userId, balance });
            } else {
                res.status(404).json({ message: 'Joueur non trouvé ou transactions non existantes' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue' });
        }
    }

    async updateCreditBalance(req: Request, res: Response) {
        try {
            const persistence = new TransactionPersistence(Database.get())
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
