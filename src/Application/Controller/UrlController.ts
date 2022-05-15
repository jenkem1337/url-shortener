import { Request, Response } from 'express';
import shortid from 'shortid';
import UrlCreationCommand from '../../Core/Service/Command/RequestModel/UrlCreationCommand';
import UrlCodeQuery from '../../Core/Service/Query/RequestModel/UrlCodeQuery';
import FindAllUrlQuery from '../../Core/Service/Query/RequestModel/FindAllQuery';
import ApiResponse from '../../Core/Service/ResponseModel/ApiResponse';
import RedirectionToOriginalUrlQuery from '../../Core/Service/Query/RequestModel/RedirectionToOriginalUrlQuery';
import RedirectLongUrlResponse from '../../Core/Service/ResponseModel/RedirectLongUrlResponse';
import DispatcherContext from '../../Core/Service/DispatcherStrategy/DispatcherContext';

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

    public async saveUrl(req:Request,res:Response){
        const {longUrl} = req.body
        
        const creationalCommand = new UrlCreationCommand()
        creationalCommand.setLongUrl(longUrl)
        creationalCommand.setUrlCode(shortid.generate())
        creationalCommand.setShortUrl(req.protocol + "://" + req.headers.host + "/api/v1/" + creationalCommand.getUrlCode() )
        
        let response  = <ApiResponse> await this.dispatcherContext.sendToDispatcher(creationalCommand)
        res
            .status(response.getStatusCode())
            .send(response.getResult())

    }
     
    public async findOneByUrlCode(req:Request,res:Response){
        const {url_code} = req.params
        
        const urlCodeQuery = new UrlCodeQuery()
        urlCodeQuery.setUrlCode(url_code)
        
        let response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(urlCodeQuery)
        
        res
            .status(response.getStatusCode())
            .send(response.getResult())

    }

    public async redirectToOriginalUrl(req:Request,res:Response){
        const {url_code} = req.params

        const query = new RedirectionToOriginalUrlQuery()
        query.setUrlCode(url_code)

        let response = <ApiResponse> await this.dispatcherContext.sendToDispatcher(query)
        
        let result = <RedirectLongUrlResponse> response.getResult()
        if(result instanceof RedirectLongUrlResponse){
            res.redirect(result.getLongUrl())
        }
        res.status(response.getStatusCode()).send(response.getResult())
        
        
        

    }
}
