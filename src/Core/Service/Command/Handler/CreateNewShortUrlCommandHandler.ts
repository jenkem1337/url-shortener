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

export default class CreateNewShhortUrlCommandHandler implements ICommandHandler<UrlCreationCommand, Promise<ApiResponse>>{
    
    private urlRepository: IUrlRepository
    private urlFactory: IFactory<Url>
    
    constructor(repo: IUrlRepository, urlFactory: IFactory<Url>){
        this.urlRepository = repo
        this.urlFactory = urlFactory
    }

    async execute(command: UrlCreationCommand): Promise<ApiResponse> {
        try {
            let url = this.urlFactory.createInstance(
                uuid(), command.getLongUrl(), command.getUrlCode(), command.getShortUrl(), new Date())
            
            await this.urlRepository.saveAndChanges(url)
            
            return new ApiResponse(HttpStatusCode.OK, new SavedUrlResponse(url.getUuid(), url.getUrlCode(), url.getLongUrl(), url.getShortUrl(), url.getHowMuchTimeClicked(), url.getWhenCreated() ))
        } catch (error: any) {
            return new ApiResponse(error.statusCode, new ErrorResponse(error.message) )
        }
    }
    
}