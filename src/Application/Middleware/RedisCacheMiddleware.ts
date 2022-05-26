import { NextFunction, Request, Response } from 'express';
import FindCachedUrlByUrlCodeQuery from '../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import HttpStatusCode from '../../Core/Service/ResponseModel/HttpStatus';
import DispatcherContext from '../../Core/Service/DispatcherStrategy/DispatcherContext';
import ApiResponse from '../../Core/Service/ResponseModel/ApiResponse';
import CachedUrlResponse from '../../Core/Service/ResponseModel/CachedUrlResponse';

export default class RedisCacheMiddleware{
    private dispatcherContext: DispatcherContext
    
    public constructor(dispatcherContext: DispatcherContext){
        this.dispatcherContext = dispatcherContext
    }

    public async getUrl(req:Request, res:Response, next:NextFunction){
        const {url_code} = req.params
        let query = new FindCachedUrlByUrlCodeQuery()
        query.setUrlCode(url_code)
        const response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(query)
        
        if(response){            
            res.status(response.getStatusCode()).json(response.getResult())
        }
        else{
            next()
        }
    }

}