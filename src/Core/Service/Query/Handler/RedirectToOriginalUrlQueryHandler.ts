import IQueryHandler from '../IQueryHandler';
import ApiResponse from '../../ResponseModel/ApiResponse';
import RedirectionToOriginalUrlQuery from '../RequestModel/RedirectionToOriginalUrlQuery';
import IUrlRepository from '../../../Interface/IUrlRepository';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import RedirectLongUrlResponse from '../../ResponseModel/RedirectLongUrlResponse';
export default class RedirectToOriginalUrlQueryHandler implements IQueryHandler<RedirectionToOriginalUrlQuery ,Promise<ApiResponse>> {
    
    private urlRepository: IUrlRepository

    constructor(urlRepo: IUrlRepository){
        this.urlRepository = urlRepo
    }
    
    async execute(query: RedirectionToOriginalUrlQuery): Promise<ApiResponse> {
       
            let originalUrl = await this.urlRepository.findByUrlCode(query.getUrlCode())
                        
            return new ApiResponse(HttpStatusCode.OK, new RedirectLongUrlResponse(originalUrl.getLongUrl()))
    }

}