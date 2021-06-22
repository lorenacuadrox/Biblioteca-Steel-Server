import { Book } from "../models/book";
import { useCollection, useDatabase } from "../services/database";
 
export async function listBook() {
    const database = await useDatabase()

    const query = `
        FOR book IN books
            RETURN MERGE(book, {
                author: DOCUMENT("authors", book.author),
            })
    `
    const results = await database.query(query)
    return await results.all()
}

export async function listBooksByEditorial(editorial: string) {
    try {
        const database = await useDatabase()

        const query = `
            FOR book IN books
                FILTER book.editorial == @editorial
                RETURN book
        `
        const results = await database.query(query, { editorial })
        return await results.all()
    }

    catch (err) {
        return []
    }
}

export async function listBookByAuthor(author: string) {
    const database = await useDatabase()

    const query = `
        FOR book IN books
            FILTER book.author == @author
            RETURN book
    `
    const results = await database.query(query, { author })
}