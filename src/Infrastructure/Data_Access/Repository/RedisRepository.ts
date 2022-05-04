import Redis from 'ioredis';
import ICacheRepository from '../../../Core/Interface/ICacheRepository';
import Url from '../../../Core/Domain/Url';

export default class RedisRepository implements ICacheRepository{
    private client: any;
    
    public constructor(redis:Redis){
        this.client = redis
        
    }
    public async saveUrl(url: Url) {
        await this.client.hmset(url.getUrlCode(), 'shortUrl', url.getShortUrl(), 'longUrl', url.getLongUrl(), 'howMuchTimeClicked', url.getHowMuchTimeClicked())
        await this.client.expire(url.getUrlCode(), 10)

    }
    public async getUrl(urlCode:string) {
        return await this.client.hgetall(urlCode)
        
    }
}
