import express, { Request, Response } from "express";
import 'reflect-metadata'
import cors from "cors";
import { urlRouter } from "../../Application/Router/UrlRouter";
import DatabaseConnection from '../Data_Access/DataResource/DatabaseConnection';
import BaseException from '../../Core/Exception/BaseException';
import { NextFunction } from 'express';
import FactoryCreator from "../../Application/Factory/FactoryCreator";
import ErrorHandlingMiddlewareFactory from '../../Application/Factory/MiddlewareFactory/ErrorHandlingFactory';

const app = express()

let errorHandlingMiddleware = FactoryCreator.initFactory(new ErrorHandlingMiddlewareFactory)

let handleError = (err: BaseException, req:Request, res:Response, next: NextFunction) => errorHandlingMiddleware.handleError(err, req,res,next)


const server = async () =>{


    try {
        DatabaseConnection.getInstace()        

        app.use(cors())
        app.use(express.json())
        app.use("/api/v1/", urlRouter)
        app.use(handleError)
        app.listen(8000, () => console.log('sunucu 8000 portunda çalışıyor'))

    } catch (error) {
        throw new Error(error)
    }
}
server()
