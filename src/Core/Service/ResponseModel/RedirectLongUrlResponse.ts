export default class RedirectLongUrlResponse{
    private longUrl:string

    constructor(longUrl: string){
        this.longUrl = longUrl
    }

    public getLongUrl(): string {
        return this.longUrl;
    }

}