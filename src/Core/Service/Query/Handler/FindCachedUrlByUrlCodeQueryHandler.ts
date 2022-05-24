import IQueryHandler from '../IQueryHandler';
import FindCachedUrlByUrlCodeQuery from '../RequestModel/FindCachedUrlByUrlCodeQuery';
import ICacheRepository from '../../../Interface/ICacheRepository';
export default class FindCachedUrlByUrlCodeQueryHandler implements IQueryHandler<FindCachedUrlByUrlCodeQuery, Promise<object>> {
    
    private redisRepository: ICacheRepository

    constructor(redisRepo: ICacheRepository){
        this.redisRepository = redisRepo
    }
    async execute(query: FindCachedUrlByUrlCodeQuery): Promise<object> {
        const url = await this.redisRepository.getUrl(query.getUrlCode())
           
        if(Object.keys(url).length !== 0){
            return url
        }

    }
    
}