import { Collection, Db } from "mongodb";

export default class TransactionPersistance
{
    private static COLLECTION_NAME = "transaction"

    private collection: Collection

    public constructor(db: Db) {
        this.collection = db.collection(TransactionPersistance.COLLECTION_NAME)
    }
}
