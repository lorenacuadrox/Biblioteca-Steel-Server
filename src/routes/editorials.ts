import { Router } from "express"
import { createEditorial } from "../usecases/createEditorials"
import { listEditorials } from "../usecases/findEditorials"

export const editorialRoute = Router()

editorialRoute.get("/", async function (req, res, next){
    try {
        const editorials = await listEditorials()
        return res.send({ content: editorials})
    }

    catch (err) {
        next(err)
    }
})

editorialRoute.post("/", async function (req, res, next) {
    try {
        const { name, address, phone, email, maxBooks} = req.body

        if (name && address && phone && email && maxBooks) {
            const doc = await createEditorial({
                name: name,
                address: address,
                phone: phone,
                email: email,
                maxBooks: maxBooks,
            })

            return res.send({ code: "editorial_created", content: doc})
        }

        else {
            return res
                .status(400)
                .send({ code: "Invalid body"})
        }
    }

    catch (err) {
        next(err)
    }
})