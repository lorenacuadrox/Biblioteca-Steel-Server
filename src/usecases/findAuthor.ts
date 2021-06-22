import { useDatabase } from "../services/database";

export async function listAuthors() {
    const database = await useDatabase()

    const query = `
        FOR author IN authors
            RETURN author
    `
    const result = await database.query(query)
    return await result.all()
}
