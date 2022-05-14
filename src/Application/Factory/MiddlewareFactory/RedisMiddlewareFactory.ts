import IFactory from '../IFactory';
import RedisCacheMiddleware from '../../Middleware/RedisCacheMiddleware';
import Redis from 'ioredis';
import DispatcherContext from '../../../Core/Service/DispatcherContext';
import QueryDispatcher from '../../../Core/Service/Query/QueryDispatcher';
import FindCachedUrlByUrlCodeQuery from '../../../Core/Service/Query/RequestModel/FindCachedUrlByUrlCodeQuery';
import FindCachedUrlByUrlCodeQueryHandler from '../../../Core/Service/Query/Handler/FindCachedUrlByUrlCodeQueryHandler';
import RedisRepository from '../../../Infrastructure/Data_Access/Repository/RedisRepository';
import CommandRequestStrategy from '../../../Core/Service/DispatcherStrategy/CommandRequestStrategy';
import IRequestStrategy from '../../../Core/Service/DispatcherStrategy/IRequestStrategy';
import QueryRequestStrategy from '../../../Core/Service/DispatcherStrategy/QueryRequestStrategy';

export default class RedisMiddlewareFactory implements IFactory<RedisCacheMiddleware>{
    
    public createInstance():RedisCacheMiddleware {
        let dispatcherContext = new DispatcherContext()
        
        
        let queryRequestStrategy = new QueryRequestStrategy()
        
        
        let queryDispatcher = new QueryDispatcher(queryRequestStrategy)

        dispatcherContext.setStrategies(new Map<string, IRequestStrategy>([
            [
                QueryRequestStrategy.name, queryRequestStrategy
            ],
        ]))
        queryDispatcher.addService(FindCachedUrlByUrlCodeQuery.name, new FindCachedUrlByUrlCodeQueryHandler(new RedisRepository(new Redis())))
        return new RedisCacheMiddleware(dispatcherContext)
    }
}