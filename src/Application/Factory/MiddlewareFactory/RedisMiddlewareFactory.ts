import IFactory from '../IFactory';
import RedisCacheMiddleware from '../../Middleware/RedisCacheMiddleware';
import Redis from 'ioredis';
import DispatcherContext from '../../../Core/Service/DispatcherStrategy/DispatcherContext';
import QueryDispatcher from '../../../Core/Service/Query/QueryDispatcher';
import FindCachedUrlByUrlCodeQuery from '../../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import FindCachedUrlByUrlCodeQueryHandler from '../../../Core/Service/Query/Handler/FindCachedUrlByUrlCodeQueryHandler';
import RedisRepository from '../../../Infrastructure/Data_Access/Repository/RedisRepository';
import IRequestStrategy from '../../../Core/Service/DispatcherStrategy/IRequestStrategy';
import QueryRequestStrategy from '../../../Core/Service/DispatcherStrategy/QueryRequestStrategy';
import Query from '../../../Core/Service/Query/Query';

export default class RedisMiddlewareFactory implements IFactory<RedisCacheMiddleware>{
    
    public createInstance():RedisCacheMiddleware {
        
        let queryRequestStrategy = new QueryRequestStrategy()
        
        let queryDispatcher = new QueryDispatcher(queryRequestStrategy)

        
        queryDispatcher.addService(FindCachedUrlByUrlCodeQuery.name, new FindCachedUrlByUrlCodeQueryHandler(new RedisRepository(new Redis())))
        
        return new RedisCacheMiddleware(new DispatcherContext(new Map<string, IRequestStrategy>([
            [
                Query.name, queryRequestStrategy
            ],
        ])))
    }
}