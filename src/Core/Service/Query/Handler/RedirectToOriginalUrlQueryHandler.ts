import IQueryHandler from '../IQueryHandler';
import ApiResponse from '../../ResponseModel/ApiResponse';
import RedirectionToOriginalUrlQuery from '../RequestModel/RedirectionToOriginalUrlQuery';
import IUrlRepository from '../../../Interface/IUrlRepository';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import RedirectLongUrlResponse from '../../ResponseModel/RedirectLongUrlResponse';
import ErrorResponse from '../../ResponseModel/ErrorResponse';
import Query from '../Query';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
export default class RedirectToOriginalUrlQueryHandler implements IQueryHandler<RedirectionToOriginalUrlQuery ,Promise<ApiResponse>> {
    
    private urlRepository: IUrlRepository

    constructor(urlRepo: IUrlRepository){
        this.urlRepository = urlRepo
    }
    
    async execute(query: RedirectionToOriginalUrlQuery): Promise<ApiResponse> {
        try {
            let originalUrl = await this.urlRepository.findByUrlCode(query.getUrlCode())
            
            
            originalUrl.incrementClickCounter()
            await this.urlRepository.saveAndChanges(originalUrl)
            
            return new ApiResponse(HttpStatusCode.OK, new RedirectLongUrlResponse(originalUrl.getLongUrl()))
        
        } catch (error: any) {
            return new ApiResponse(error.statusCode , new ErrorResponse(error.message))
        }
    }

}