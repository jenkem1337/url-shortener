import Redis  from 'ioredis';
import UrlController from '../../Controller/UrlController';
import IFactory from '../IFactory';
import DispatcherContext from '../../../Core/Service/DispatcherStrategy/DispatcherContext';
import QueryDispatcher from '../../../Core/Service/Query/QueryDispatcher';
import CommandDispatcher from '../../../Core/Service/Command/CommandDispatcher';
import FindAllUrlQueryHandler from '../../../Core/Service/Query/Handler/FindAllUrlQueryHandler';
import FindAllUrlQuery from '../../../Core/Service/Query/RequestModel/FindAllQuery';
import UrlRepository from '../../../Infrastructure/Data_Access/Repository/UrlRepository';
import UrlCreationCommand from '../../../Core/Service/Command/RequestModel/UrlCreationCommand';
import CreateNewShhortUrlCommandHandler from '../../../Core/Service/Command/Handler/CreateNewShortUrlCommandHandler';
import UrlFactory from '../../../Core/Factory/UrlFactory';
import RedirectionToOriginalUrlQuery from '../../../Core/Service/Query/RequestModel/RedirectionToOriginalUrlQuery';
import RedirectToOriginalUrlQueryHandler from '../../../Core/Service/Query/Handler/RedirectToOriginalUrlQueryHandler';
import UrlCodeQuery from '../../../Core/Service/Query/RequestModel/UrlCodeQuery';
import FindOneByUrlCodeQueryHandler from '../../../Core/Service/Query/Handler/FindOneByUrlCodeQueryHandler';
import RedisRepository from '../../../Infrastructure/Data_Access/Repository/RedisRepository';
import IRequestStrategy from '../../../Core/Service/DispatcherStrategy/IRequestStrategy';
import QueryRequestStrategy from '../../../Core/Service/DispatcherStrategy/QueryRequestStrategy';
import CommandRequestStrategy from '../../../Core/Service/DispatcherStrategy/CommandRequestStrategy';
import Query from '../../../Core/Service/Query/Query';
import Command from '../../../Core/Service/Command/Command';
import DatabaseConnection from '../../../Infrastructure/Data_Access/DataResource/DatabaseConnection';
import SaveUrlCacheCommand from '../../../Core/Service/Command/RequestModel/SaveUrlCacheCommand';
import SaveUrlCacheCommandHandler from '../../../Core/Service/Command/Handler/SaveUrlCacheCommandHandler';
import IncrementUrlCounterCommand from '../../../Core/Service/Command/RequestModel/IncrementUrlCounterCommand';
import IncrementUrlCounterCommandHandler from '../../../Core/Service/Command/Handler/IncrementUrlCoınterCommandHandler';

export default class UrlControllerFactory implements IFactory<UrlController>{
  
    public createInstance():UrlController{

        let queryRequestStrategy = new QueryRequestStrategy()
        let commandRequestStrategy = new CommandRequestStrategy()
        
        let queryDispatcher = new QueryDispatcher(queryRequestStrategy)
        let commandDispatcher = new CommandDispatcher(commandRequestStrategy)


        

        commandDispatcher.addService(UrlCreationCommand.name, new CreateNewShhortUrlCommandHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace() ), new UrlFactory()))
                        .addService(SaveUrlCacheCommand.name, new SaveUrlCacheCommandHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace()), new RedisRepository(new Redis())))
                        .addService(IncrementUrlCounterCommand.name, new IncrementUrlCounterCommandHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace()) ))


        queryDispatcher.addService(FindAllUrlQuery.name, new FindAllUrlQueryHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace())))
                        .addService(RedirectionToOriginalUrlQuery.name, new RedirectToOriginalUrlQueryHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace())))
                        .addService(UrlCodeQuery.name, new FindOneByUrlCodeQueryHandler(new UrlRepository(new UrlFactory(), DatabaseConnection.getInstace()), new RedisRepository(new Redis())))

        return new UrlController(new DispatcherContext(new Map<string, IRequestStrategy>([
            [
                Query.name, queryRequestStrategy
            ],
            [
                Command.name , commandRequestStrategy
            ]
        ])))
    }
}