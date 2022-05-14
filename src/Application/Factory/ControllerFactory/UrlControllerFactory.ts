import Redis  from 'ioredis';
import UrlController from '../../Controller/UrlController';
import IFactory from '../IFactory';
import DispatcherContext from '../../../Core/Service/DispatcherContext';
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

export default class UrlControllerFactory implements IFactory<UrlController>{
  
    public createInstance():UrlController{
        let dispatcherContext = new DispatcherContext()

        let queryRequestStrategy = new QueryRequestStrategy()
        let commandRequestStrategy = new CommandRequestStrategy()
        
        let queryDispatcher = new QueryDispatcher(queryRequestStrategy)
        let commandDispatcher = new CommandDispatcher(commandRequestStrategy)

        dispatcherContext.setStrategies(new Map<string, IRequestStrategy>([
            [
                QueryRequestStrategy.name, queryRequestStrategy
            ],
            [
                CommandRequestStrategy.name, commandRequestStrategy
            ]
        ]))

        commandDispatcher.addService(UrlCreationCommand.name, new CreateNewShhortUrlCommandHandler(new UrlRepository(), new UrlFactory()))
          
        queryDispatcher.addService(FindAllUrlQuery.name, new FindAllUrlQueryHandler(new UrlRepository()))
                        .addService(RedirectionToOriginalUrlQuery.name, new RedirectToOriginalUrlQueryHandler(new UrlRepository()))
                        .addService(UrlCodeQuery.name, new FindOneByUrlCodeQueryHandler(new UrlRepository(), new RedisRepository(new Redis())))

        return new UrlController(dispatcherContext)
    }
}