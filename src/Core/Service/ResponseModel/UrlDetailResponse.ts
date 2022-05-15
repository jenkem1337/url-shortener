export default class UrlDetailResponse{
    private shortUrl: string
    private longUrl:string
    private howManyTimeClicked:number

    constructor(shortUrl: string,
        longUrl:string,
        howManyTimeClicked:number){
            this.shortUrl= shortUrl
            this.longUrl = longUrl
            this.howManyTimeClicked = howManyTimeClicked
        }
}