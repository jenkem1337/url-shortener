import express from "express";
import 'reflect-metadata'
import cors from "cors";
import { urlRouter } from "../../Application/Router/UrlRouter";
import DatabaseConnection from '../Data_Access/DataResource/DatabaseConnection';

const app = express()

const server = async () => {


    try {
        DatabaseConnection.getInstace()        

        app.use(cors())
        app.use(express.json())
        app.use("/api/v1/", urlRouter)
        app.listen(8000, () => console.log('sunucu 8000 portunda çalışıyor'))

    } catch (error) {
        throw new Error(error)
    }
}

server()
