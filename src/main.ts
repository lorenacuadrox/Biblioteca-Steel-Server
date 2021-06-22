

import express, { NextFunction, Request, Response, json } from "express"
import cors from "cors"

import { authorRoute } from "./routes/authors"
import { bookRoute } from "./routes/books"
import { editorialRoute } from "./routes/editorials"

const server = express()

server.use(json())
server.use(cors())

server.use("/author", authorRoute)
server.use("/book", bookRoute)
server.use("/editorial", editorialRoute)

server.use("*", function (req, res){
    return res
        .status(405)
        .send({code: "not_implemented"})
})

server.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    return res
        .status(500)
        .send({
            code: "internal_error",
            content: err.message
        })
})

server.listen(5000, function () {
    console.log("Server is runing at http://localhost:5000")
})