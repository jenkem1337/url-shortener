import Redis from 'ioredis';
import ICacheRepository from '../../../Core/Interface/ICacheRepository';
import Url from '../../../Core/Domain/Url';

export default class RedisRepository implements ICacheRepository{
    private client: Redis;
    
    public constructor(redis:Redis){
        this.client = redis
        
    }
    public async saveChanges(url: Url):Promise<void> {
        await this.client.hmset(url.getUrlCode(), 'shortUrl', url.getShortUrl(), 'longUrl', url.getLongUrl(), 'howMuchTimeClicked', url.getHowMuchTimeClicked())
    }
    public async getUrl(urlCode:string):Promise<any> {
        return await this.client.hgetall(urlCode)        
    }
}
