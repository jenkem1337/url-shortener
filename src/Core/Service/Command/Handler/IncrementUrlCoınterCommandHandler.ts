import IUrlRepository from '../../../Interface/IUrlRepository';
import ICommandHandler from '../ICommandHandler';
import IncrementUrlCounterCommand from '../RequestModel/IncrementUrlCounterCommand';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
import ICacheRepository from '../../../Interface/ICacheRepository';
export default class IncrementUrlCounterCommandHandler implements ICommandHandler<IncrementUrlCounterCommand>{

    private urlRepository: IUrlRepository
    private cacheRepository: ICacheRepository

    constructor(urlRepo: IUrlRepository, cacheRepo:ICacheRepository){
        this.urlRepository = urlRepo
        this.cacheRepository = cacheRepo
    }


    async execute(command: IncrementUrlCounterCommand): Promise<void> {
        let originalUrl = await this.urlRepository.findByUrlCode(command.getUrlCode())
        
        if(!originalUrl) {
            throw new UrlDoesntExistException()
        }
        originalUrl.incrementClickCounter()
        
        this.urlRepository.saveChanges(originalUrl)
        this.cacheRepository.saveChanges(originalUrl)
    }
    
}