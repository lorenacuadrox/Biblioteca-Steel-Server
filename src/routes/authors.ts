import { Router } from "express"
import { createAuthor } from "../usecases/createAuthors"
import { listAuthors } from "../usecases/findAuthor"

export const authorRoute = Router()

authorRoute.get("/", async function (req, res, next) {
    try {
        const authors = await listAuthors()
        return res.send({ content: authors})
    }

    catch (err) {
        next(err)
    }
})

authorRoute.post("/", async function (req, res, next){
    try {
        const { name, birthDate, city, email } = req.body

        if (name && birthDate && city && email) {  
            const doc = await createAuthor({
                name: name,
                email: email,
                birthDate: birthDate,
                city: city,
            })

            return res.send({ code: "author_created", content: doc })
        }

        else {
            return res
                .status(400)
                .send({code: "invalid body"})
        }
    }

    catch (err) {
        next(err)
    }
})