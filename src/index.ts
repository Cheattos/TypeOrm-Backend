import * as express from "express"
import * as cors from "cors";
import { AppDataSource } from "./data-source"
import { Request, Response } from "express"
import router from "./route/routes"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        app.use(express.json())
        const port = 5000

        const corsOption = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }

        app.use(cors(corsOption))

        app.use("/api/v1", router)


        app.listen(port, () => {
            console.log("Server berjalan pada port 5000")
        })
    })
    .catch(error => console.log(error))
