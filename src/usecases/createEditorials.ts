import { Editorial } from "../models/editorial"
import { useCollection } from "../services/database"

export async function createEditorial(editorial: Editorial) {
    try {
        const editorials = await useCollection<Editorial>("editorials")
        const doc = await editorials.save(editorial, {returnNew: true})

        return doc.new
    }

    catch (err) {
        console.error(err)
        return undefined
    }
}