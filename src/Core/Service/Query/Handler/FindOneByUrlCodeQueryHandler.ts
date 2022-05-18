import IQueryHandler from '../IQueryHandler';
import UrlCodeQuery from '../RequestModel/UrlCodeQuery';
import ApiResponse from '../../ResponseModel/ApiResponse';
import IUrlRepository from '../../../Interface/IUrlRepository';
import ICacheRepository from '../../../Interface/ICacheRepository';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import UrlDetailResponse from '../../ResponseModel/UrlDetailResponse';
export default class FindOneByUrlCodeQueryHandler implements IQueryHandler<UrlCodeQuery, Promise<ApiResponse>> {
    
    private urlRepository: IUrlRepository
    private cacheRepository: ICacheRepository

    constructor(urlRepo: IUrlRepository, cacheRepo: ICacheRepository){
        this.urlRepository = urlRepo
        this.cacheRepository = cacheRepo
    }
    
    async execute(query: UrlCodeQuery): Promise<ApiResponse> {
            let url = await this.urlRepository.findByUrlCode(query.getUrlCode())
            return new ApiResponse(HttpStatusCode.OK, new UrlDetailResponse(url.getShortUrl(), url.getLongUrl(), url.getHowMuchTimeClicked()))
    }
    
}