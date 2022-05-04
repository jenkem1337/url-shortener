export default class UrlDetailResponse{
    private shortUrl: string
    private longUrl:string
    private howMuchTimeClicked:number

    constructor(shortUrl: string,
        longUrl:string,
        howMuchTimeClicked:number){
            this.shortUrl= shortUrl
            this.longUrl = longUrl
            this.howMuchTimeClicked = howMuchTimeClicked
        }
}