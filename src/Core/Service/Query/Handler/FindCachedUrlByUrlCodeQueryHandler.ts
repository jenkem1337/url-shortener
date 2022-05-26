import IQueryHandler from '../IQueryHandler';
import FindCachedUrlByUrlCodeQuery from '../RequestModel/FindCachedUrlByUrlCodeQuery';
import ICacheRepository from '../../../Interface/ICacheRepository';
import ApiResponse from '../../ResponseModel/ApiResponse';
import HttpStatusCode from '../../ResponseModel/HttpStatus';
import CachedUrlResponse from '../../ResponseModel/CachedUrlResponse';
export default class FindCachedUrlByUrlCodeQueryHandler implements IQueryHandler<FindCachedUrlByUrlCodeQuery, Promise<ApiResponse>> {
    
    private redisRepository: ICacheRepository

    constructor(redisRepo: ICacheRepository){
        this.redisRepository = redisRepo
    }
    async execute(query: FindCachedUrlByUrlCodeQuery): Promise<ApiResponse> {
        let url = await this.redisRepository.getUrl(query.getUrlCode())
        if(Object.keys(url).length !== 0){
            return new ApiResponse(HttpStatusCode.OK, new CachedUrlResponse(url.longUrl, url.shortUrl, new Number(url.howMuchTimeClicked).valueOf() ))
        }

    }
    
}