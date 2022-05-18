import { NextFunction, Request, Response, Router } from "express";
import UrlControllerFactory from '../Factory/ControllerFactory/UrlControllerFactory';
import FactoryCreator from '../Factory/FactoryCreator';
import RedisMiddlewareFactory from '../Factory/MiddlewareFactory/RedisMiddlewareFactory';


const urlRouter = Router()
const urlController   =  FactoryCreator.initFactory(new UrlControllerFactory)
const redisMiddleware =  FactoryCreator.initFactory(new RedisMiddlewareFactory)

//Middleware
const urlCodeCache = (req:Request,res:Response,next:NextFunction) => redisMiddleware.getUrl(req, res, next)


urlRouter.get("/",                                        (req:Request,res:Response) =>  urlController.findAll(req, res))
urlRouter.get("/:url_code",                               (req:Request,res:Response, next:NextFunction) =>  urlController.redirectToOriginalUrl(req,res, next))
urlRouter.post("/save-url" ,                              (req:Request,res:Response, next:NextFunction) =>  urlController.saveUrl(req,res,next))
urlRouter.get("/find-by-urlcode/:url_code", urlCodeCache, (req:Request,res:Response, next:NextFunction) =>  urlController.findOneByUrlCode(req,res, next))
export {urlRouter}