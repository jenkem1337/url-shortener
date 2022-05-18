import IUrlRepository from '../../../Interface/IUrlRepository';
import ICommandHandler from '../ICommandHandler';
import IncrementUrlCounterCommand from '../RequestModel/IncrementUrlCounterCommand';
export default class IncrementUrlCounterCommandHandler implements ICommandHandler<IncrementUrlCounterCommand>{

    private urlRepository: IUrlRepository

    constructor(urlRepo: IUrlRepository){
        this.urlRepository = urlRepo
    }


    async execute(command: IncrementUrlCounterCommand): Promise<void> {
        let originalUrl = await this.urlRepository.findByUrlCode(command.getUrlCode())
            
        originalUrl.incrementClickCounter()
        this.urlRepository.saveChanges(originalUrl)

    }
    
}