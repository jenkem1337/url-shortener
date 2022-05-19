import { NextFunction, Request, Response } from "express"
import BaseException from "../../Core/Exception/BaseException"
import ApiResponse from "../../Core/Service/ResponseModel/ApiResponse"
import ErrorResponse from "../../Core/Service/ResponseModel/ErrorResponse"
import HttpStatusCode from '../../Core/Service/ResponseModel/HttpStatus';

export default class ErrorHandlingMiddleware {
    
    handleError(err: BaseException, req:Request, res:Response, next: NextFunction){
        let response: ApiResponse
        if(!(err instanceof BaseException)){
            let e = <Error> err
             response = new ApiResponse(HttpStatusCode.BAD_REQUEST, new ErrorResponse(e.message))
             res.status(response.getStatusCode()).send(response.getResult())
        }
        response = new ApiResponse(err.statusCode, new ErrorResponse(err.message))
        res.status(response.getStatusCode()).send(response.getResult())
    
    }
}