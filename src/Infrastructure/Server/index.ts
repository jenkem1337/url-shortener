import express from "express";
import { createConnection } from "typeorm";
import 'reflect-metadata'
import cors from "cors";
import { urlRouter } from "../../Application/Router/UrlRouter";
import ORM_Url from "../Entity/ORM_Url";

const app = express()

const server = async () => {


    try {
        let conn = await createConnection({
            type: "postgres",
            host: "localhost",                                 
            port: 5432,
            username: "postgres",
            password: "admin",
            database: "postgres",
            entities: [ORM_Url],
            synchronize: true
        })
        
        app.use(cors())
        app.use(express.json())
        app.use("/api/v1/", urlRouter)
        app.listen(8000, () => console.log('sunucu 8000 portunda çalışıyor'))

    } catch (error) {
        throw new Error(error)
    }
}

server()
