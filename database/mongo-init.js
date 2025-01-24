require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

// Connect to Client
const client = new MongoClient(process.env.DB_URL)
client.connect().then(async () => {

    // Create database
    const db = client.db(process.env.DB_NAME)

    // Create collection: transaction
    await db.createCollection('transaction')

    await client.close()
})
