import IQueryHandler from '../IQueryHandler';
import UrlCodeQuery from '../RequestModel/UrlCodeQuery';
import ApiResponse from '../../ResponseModel/ApiResponse';
import IUrlRepository from '../../../Interface/IUrlRepository';
import ICacheRepository from '../../../Interface/ICacheRepository';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import UrlDetailResponse from '../../ResponseModel/UrlDetailResponse';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
export default class FindOneByUrlCodeQueryHandler implements IQueryHandler<UrlCodeQuery, Promise<ApiResponse>> {
    
    private urlRepository: IUrlRepository

    constructor(urlRepo: IUrlRepository){
        this.urlRepository = urlRepo
    }
    
    async execute(query: UrlCodeQuery): Promise<ApiResponse> {
            let url = await this.urlRepository.findByUrlCode(query.getUrlCode())

            if(!url){
                throw new UrlDoesntExistException()
            }
            return new ApiResponse(HttpStatusCode.OK, new UrlDetailResponse(url.getShortUrl(), url.getLongUrl(), url.getHowMuchTimeClicked()))
    }
    
}