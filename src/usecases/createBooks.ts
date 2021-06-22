import { Book } from "../models/book"
import { useCollection } from "../services/database"

export async function createBook(book: Book) {
    try {
        const books = await useCollection<Book>("books")
        const doc = await books.save(book, { returnNew : true})

        return doc.new
    }

    catch (err) {
        return undefined
    }
}