import Url from '../Domain/Url';
export default interface IUrlRepository{
    findAll():Promise<Url[]>
    saveChanges(url:Url):Promise<void>
    findByUrlCode(urlCode:string):Promise<Url>
}