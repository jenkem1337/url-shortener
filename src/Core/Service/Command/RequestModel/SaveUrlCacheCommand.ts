import Command from "../Command"

export default class SaveUrlCacheCommand extends Command{
    private urlCode:string

    public setUrlCode(urlCode:string):void{
        this.urlCode = urlCode
    }

    public getUrlCode():string{
        return this.urlCode
    }
}