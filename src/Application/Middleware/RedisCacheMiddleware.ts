import { NextFunction, Request, Response } from 'express';
import FindCachedUrlByUrlCodeQuery from '../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import HttpStatusCode from '../../Core/Service/ResponseModel/HttpStatus';
import DispatcherContext from '../../Core/Service/DispatcherContext';
import QueryRequestStrategy from '../../Core/Service/DispatcherStrategy/QueryRequestStrategy';

export default class RedisCacheMiddleware{
    private dispatcherContext: DispatcherContext
    
    public constructor(dispatcherContext: DispatcherContext){
        this.dispatcherContext = dispatcherContext
    }

    public async getUrl(req:Request, res:Response, next:NextFunction){
        const {url_code} = req.params
        let query = new FindCachedUrlByUrlCodeQuery()
        query.setUrlCode(url_code)
        const url = await this.dispatcherContext.sendToDispatcher(QueryRequestStrategy.name ,query)
        
        if(url){
            res.status(HttpStatusCode.OK).json(url)
        }
        else{
            next()
        }
    }

}