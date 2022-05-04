import Url from '../Domain/Url';
export default interface IUrlRepository{
    findAll():Promise<Url[]>
    saveAndChanges(url:Url):Promise<void>
    findByUrlCode(urlCode:string):Promise<Url>
}