import { NextFunction, Request, Response } from 'express';
import BaseDispatcherContext from '../../Core/Service/BaseDispatcherContext';
import FindCachedUrlByUrlCodeQuery from '../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import HttpStatusCode from '../../Core/Service/ResponseModel/HttpStatus';

export default class RedisCacheMiddleware{
    private dispatcherContext: BaseDispatcherContext
    
    public constructor(dispatcherContext: BaseDispatcherContext){
        this.dispatcherContext = dispatcherContext
    }

    public async getUrl(req:Request, res:Response, next:NextFunction){
        const {url_code} = req.params
        let query = new FindCachedUrlByUrlCodeQuery()
        query.setUrlCode(url_code)
        const url = await this.dispatcherContext.sendQuery(query)
        
        if(url){
            res.status(HttpStatusCode.OK).json(url)
        }
        else{
            next()
        }
    }

}