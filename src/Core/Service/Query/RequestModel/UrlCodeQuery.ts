import Query from "../Query"

export default class UrlCodeQuery extends Query{
    private urlCode:string

    public setUrlCode(urlCode:string):void{
        this.urlCode = urlCode
    }

    public getUrlCode():string{
        return this.urlCode
    }
}