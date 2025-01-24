import { MongoClient } from "mongodb";

export namespace Database
{
    const client = new MongoClient(process.env.DB_URL || 'NO URL, CHECK .env')

    export function get() {
        return client.db(process.env.DB_NAME)
    }
    export async function connect() {
        return client.connect()
    }
    export async function close() {
        return client.close()
    }
}
