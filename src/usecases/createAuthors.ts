import { Author } from "../models/author"
import { useCollection } from "../services/database"

export async function createAuthor(author: Author) {
    try {
        const authors = await useCollection<Author>("authors")
        const doc = await authors.save(author, { returnNew : true})

        return doc.new
    }

    catch (err) {
        console.error(err)
        return undefined
    }
}