import { NextFunction, Request, Response } from 'express';
import shortid from 'shortid';
import UrlCreationCommand from '../../Core/Service/Command/RequestModel/UrlCreationCommand';
import UrlCodeQuery from '../../Core/Service/Query/RequestModel/UrlCodeQuery';
import FindAllUrlQuery from '../../Core/Service/Query/RequestModel/FindAllQuery';
import ApiResponse from '../../Core/Service/ResponseModel/ApiResponse';
import RedirectionToOriginalUrlQuery from '../../Core/Service/Query/RequestModel/RedirectionToOriginalUrlQuery';
import RedirectLongUrlResponse from '../../Core/Service/ResponseModel/RedirectLongUrlResponse';
import DispatcherContext from '../../Core/Service/DispatcherStrategy/DispatcherContext';
import HttpStatusCode from '../../Core/Service/ResponseModel/HttpStatus';
import IncrementUrlCounterCommand from '../../Core/Service/Command/RequestModel/IncrementUrlCounterCommand';
import SaveUrlCacheCommand from '../../Core/Service/Command/RequestModel/SaveUrlCacheCommand';


export default class UrlController{
    private dispatcherContext: DispatcherContext
    
    public constructor(dispatcherContext: DispatcherContext ){
        this.dispatcherContext = dispatcherContext
    }

    public async findAll(req:Request, res:Response){
        let query = new FindAllUrlQuery()
        let  response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(query)
        
        res
            .status(response.getStatusCode())
            .send(response.getResult())
        
    }

    public saveUrl(req:Request,res:Response, next:NextFunction){
        try {
            const {longUrl} = req.body
        
            const creationalCommand = new UrlCreationCommand()
            creationalCommand.setLongUrl(longUrl)
            creationalCommand.setUrlCode(shortid.generate())
            creationalCommand.setHowManyTimeClicked(0)
            creationalCommand.setShortUrl(req.protocol + "://" + req.headers.host + "/api/v1/" + creationalCommand.getUrlCode() )
            
            this.dispatcherContext.sendToDispatcher(creationalCommand)
            
            res
                .status(HttpStatusCode.OK)
                .send(creationalCommand)

        } catch (error) {
            next(error)
        }


    }
     
    public async findOneByUrlCode(req:Request,res:Response, next:NextFunction){
        try {
            const {url_code} = req.params
        
            const urlCodeQuery = new UrlCodeQuery()
            urlCodeQuery.setUrlCode(url_code)
            
            let saveCacheCommand = new SaveUrlCacheCommand()
            saveCacheCommand.setUrlCode(url_code)
            
            this.dispatcherContext.sendToDispatcher(saveCacheCommand)

            let response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(urlCodeQuery)
            
            res
                .status(response.getStatusCode())
                .send(response.getResult())
    

        } catch (error) {
            next(error)
        }
    }

    public async redirectToOriginalUrl(req:Request,res:Response, next:NextFunction){
            try {
                const {url_code} = req.params
                
                let incerementCounterCommand = new IncrementUrlCounterCommand()
                incerementCounterCommand.setUrlCode(url_code)
    
    
                const query = new RedirectionToOriginalUrlQuery()
                query.setUrlCode(url_code)
    
                this.dispatcherContext.sendToDispatcher(incerementCounterCommand)
                let response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(query)


                let result = <RedirectLongUrlResponse> response.getResult()
                if(result instanceof RedirectLongUrlResponse){
                    res.redirect(result.getLongUrl())
                }
            } catch (error) {
                next(error)
            }
        
    }



    
}
