import { Editorial } from "../models/editorial";
import { useCollection, useDatabase } from "../services/database";

export async function listEditorials() {
    const database = await useDatabase()

    const query = `
        FOR editorial IN editorials
        RETURN editorial
    `

    const result = await database.query(query)
    return await result.all()
}

export async function findEditorialBy(id: string) {
    const editorials = await useCollection<Editorial>("editorials")

    if (await editorials.documentExists(id) === false) {
        return undefined
    }

    return await editorials.document(id)
}