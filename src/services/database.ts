import { Database } from "arangojs"

export async function useDatabase() {
    const database = new Database({
        
        url: process.env.ARANGO_URL,
        databaseName: process.env.ARANGO_DATABASE,
        auth: {
            username: process.env.ARANGO_USER,
            password: process.env.ARANGO_PASSWORD,
        }
    })

    if (!await database.exists()) {
        database.createDatabase(process.env.ARANGO_DATABASE)
    }

    return database
}

export async function useCollection<T extends object> (name: string) {
    const database = await useDatabase()
    const collection = database.collection<T>(name)

    if (await collection.exists() === false){
        await collection.create()
    }

    return collection
}