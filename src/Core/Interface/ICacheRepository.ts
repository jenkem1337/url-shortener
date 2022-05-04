import Url from '../Domain/Url';
export default interface ICacheRepository{
    getUrl(urlCode:string)
    saveUrl(urlCacheDto:Url)
}
