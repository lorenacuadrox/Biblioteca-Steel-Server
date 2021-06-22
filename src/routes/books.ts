import { Router } from "express"
import { createBook } from "../usecases/createBooks"
import { listBook, listBooksByEditorial } from "../usecases/findBooks"
import { findEditorialBy } from "../usecases/findEditorials"

export const bookRoute = Router()

bookRoute.get("/", async function (req, res, next) {
    try {
        const authors = await listBook()
        return res.send({ content: authors})
    }

    catch (err) {
        next(err)
    }
})

bookRoute.post("/", async function (req, res, next){
    try {           
        const editorialId = req.body.editorial
        const editorial = await findEditorialBy(editorialId)
        
        if (editorial.maxBooks === -1) {
            const { title, year, gender, pages, editorial, author} = await req.body

            const doc = await createBook({
                title: title,
                year: year,
                gender: gender,
                pages: pages,
                editorial: editorial,
                author: author,
            })

            return res.send({code: "book_create", content: doc})
        }

        else {
            const books = await listBooksByEditorial(editorialId)
            if (books.length < editorial.maxBooks) { 
                const { title, year, gender, pages, editorial, author} = await req.body

                const doc = await createBook({
                    title: title,
                    year: year,
                    gender: gender,
                    pages: pages,
                    editorial: editorial,
                    author: author,
                })

                return res.send({code: "book_create", content: doc})
            }

            else {
                return res.status(400).send({code: "limit_exceeded"})
            }
        }
    }

    catch (err) {
        next(err)
    }
})