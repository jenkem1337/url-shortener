import IUrlRepository from '../../../Interface/IUrlRepository';
import ICommandHandler from '../ICommandHandler';
import IncrementUrlCounterCommand from '../RequestModel/IncrementUrlCounterCommand';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
export default class IncrementUrlCounterCommandHandler implements ICommandHandler<IncrementUrlCounterCommand>{

    private urlRepository: IUrlRepository

    constructor(urlRepo: IUrlRepository){
        this.urlRepository = urlRepo
    }


    async execute(command: IncrementUrlCounterCommand): Promise<void> {
        let originalUrl = await this.urlRepository.findByUrlCode(command.getUrlCode())
        
        if(!originalUrl) {
            throw new UrlDoesntExistException()
        }
        originalUrl.incrementClickCounter()
        this.urlRepository.saveChanges(originalUrl)

    }
    
}