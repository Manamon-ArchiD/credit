import { Collection, Db, ObjectId } from "mongodb";
import { Database } from "./Database";
import Transaction from "../model/Transaction";

export default class TransactionPersistance
{
    private static COLLECTION_NAME = "transaction"

    private collection: Collection<Transaction>

    public constructor(db: Db) {
        this.collection = db.collection<Transaction>(TransactionPersistance.COLLECTION_NAME)
    }

    public async insert(transaction: Transaction) {
        try {
            await Database.connect()
            await this.collection.insertOne(transaction)
        }
        finally {
            return Database.close()
        }
    }

    public async getByUser(userId: string): Promise<Transaction[]> {
        const filters = {userId: userId}
        try {
            await Database.connect()
            const transactions = this.collection.find(filters).toArray()

            return transactions
        }
        finally {
            await Database.close()
        }
    }
}
