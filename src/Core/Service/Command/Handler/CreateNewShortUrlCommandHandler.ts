import ICommandHandler from "../ICommandHandler";
import UrlCreationCommand from "../RequestModel/UrlCreationCommand";
import IUrlRepository from '../../../Interface/IUrlRepository';
import IFactory from '../../../Factory/IFactory';
import Url from "../../../Domain/Url";
import { uuid } from "uuidv4";
import SavedUrlResponse from '../../ResponseModel/SavedUrlResponse';
import ErrorResponse from "../../ResponseModel/ErrorResponse";
import ApiResponse from '../../ResponseModel/ApiResponse';
import HttpStatusCode from '../../ResponseModel/HttpStatus';

export default class CreateNewShhortUrlCommandHandler implements ICommandHandler<UrlCreationCommand>{
    
    private urlRepository: IUrlRepository
    private urlFactory: IFactory<Url>
    
    constructor(repo: IUrlRepository, urlFactory: IFactory<Url>){
        this.urlRepository = repo
        this.urlFactory = urlFactory
    }

    execute(command: UrlCreationCommand):void {
        
            let url = this.urlFactory.createInstance(
                uuid(), command.getLongUrl(), command.getUrlCode(), command.getShortUrl(), command.getHowManyTimeClicked() ,new Date())
            
            this.urlRepository.saveChanges(url)
    }
    
}