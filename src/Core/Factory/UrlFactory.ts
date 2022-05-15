import Url from "../Domain/Url";
import IFactory from "./IFactory";

export default class UrlFactory implements IFactory<Url>{
    createInstance(id: string, longUrl:string, urlCode:string, shortUrl:string, howManyTimeClicked ,created_at: Date): Url {
        return new Url(id, longUrl, urlCode, shortUrl, howManyTimeClicked , created_at)
    }
    
}