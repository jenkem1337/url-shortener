import Url from '../Domain/Url';
export default interface ICacheRepository{
    getUrl(urlCode:string):Promise<any>
    saveChanges(url:Url):Promise<void>
}
