import ICommandHandler from '../ICommandHandler';
import SaveUrlCacheCommand from '../RequestModel/SaveUrlCacheCommand';
import IUrlRepository from '../../../Interface/IUrlRepository';
import ICacheRepository from '../../../Interface/ICacheRepository';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
export default class SaveUrlCacheCommandHandler implements ICommandHandler<SaveUrlCacheCommand>{
    private urlRepository: IUrlRepository;
    private cacheRepository: ICacheRepository;
    
    constructor(urlRepo: IUrlRepository, cacheRepo: ICacheRepository){
        this.urlRepository = urlRepo
        this.cacheRepository = cacheRepo
    }

    async execute(command: SaveUrlCacheCommand): Promise<void> {
        let url = await this.urlRepository.findByUrlCode(command.getUrlCode())
        if(!url){
            throw new UrlDoesntExistException()
        }
        this.cacheRepository.saveChanges(url)
    }
    
}