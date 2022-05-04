import IFactory from '../IFactory';
import RedisCacheMiddleware from '../../Middleware/RedisCacheMiddleware';
import Redis from 'ioredis';
import DispatcherContext from '../../../Core/Service/DispatcherContext';
import QueryDispatcher from '../../../Core/Service/Query/QueryDispatcher';
import FindCachedUrlByUrlCodeQuery from '../../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import FindCachedUrlByUrlCodeQueryHandler from '../../../Core/Service/Query/Handler/FindCachedUrlByUrlCodeQueryHandler';
import RedisRepository from '../../../Infrastructure/Data_Access/Repository/RedisRepository';

export default class RedisMiddlewareFactory implements IFactory<RedisCacheMiddleware>{
    
    public createInstance():RedisCacheMiddleware {
        let dispatcherContext = new DispatcherContext()

        let queryDispatcher = new QueryDispatcher(dispatcherContext)
        queryDispatcher.addService(FindCachedUrlByUrlCodeQuery.name, new FindCachedUrlByUrlCodeQueryHandler(new RedisRepository(new Redis())))
        return new RedisCacheMiddleware(dispatcherContext)
    }
}