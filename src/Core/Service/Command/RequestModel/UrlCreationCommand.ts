import Command from '../Command';
export default class UrlCreationCommand extends Command {
    
    private uuid: string
    private urlCode: string
    private longUrl:string
    private shortUrl:string
    private whenCreated:Date
    private howManyTimeClicked:number

    public getUuid(): string {
        return this.uuid;
    }
    public getHowManyTimeClicked(){
        return this.howManyTimeClicked
    }
    public setHowManyTimeClicked(c: number){
        this.howManyTimeClicked = c
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getWhenCreated(): Date {
        return this.whenCreated;
    }

    public setWhenCreated(whenCreated: Date): void {
        this.whenCreated = whenCreated;
    }

    
    public getUrlCode(): string {
        return this.urlCode;
    }

    public setUrlCode(urlCode: string): void {
        this.urlCode = urlCode;
    }

    public getLongUrl(): string {
        return this.longUrl;
    }

    public setLongUrl(longUrl: string): void {
        this.longUrl = longUrl;
    }

    public getShortUrl(): string {
        return this.shortUrl;
    }

    public setShortUrl(shortUrl: string): void {
        this.shortUrl = shortUrl;
    }
}