import IQueryHandler from '../IQueryHandler';
import UrlCodeQuery from '../RequestModel/UrlCodeQuery';
import ApiResponse from '../../ResponseModel/ApiResponse';
import IUrlRepository from '../../../Interface/IUrlRepository';
import ICacheRepository from '../../../Interface/ICacheRepository';
import ErrorResponse from '../../ResponseModel/ErrorResponse';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import UrlDetailResponse from '../../ResponseModel/UrlDetailResponse';
import UrlDoesntExistException from '../../../Exception/UrlDoesntExistException';
export default class FindOneByUrlCodeQueryHandler implements IQueryHandler<UrlCodeQuery, Promise<ApiResponse>> {
    
    private urlRepository: IUrlRepository
    private cacheRepository: ICacheRepository

    constructor(urlRepo: IUrlRepository, cacheRepo: ICacheRepository){
        this.urlRepository = urlRepo
        this.cacheRepository = cacheRepo
    }
    
    async execute(query: UrlCodeQuery): Promise<ApiResponse> {
        try {
            let url = await this.urlRepository.findByUrlCode(query.getUrlCode())

            await this.cacheRepository.saveUrl(url)
            return new ApiResponse(HttpStatusCode.OK, new UrlDetailResponse(url.getShortUrl(), url.getLongUrl(), url.getHowMuchTimeClicked()))
        } catch (error: any) {
            return new ApiResponse(error.statusCode, new ErrorResponse(error.message))
        } 
    }
    
}