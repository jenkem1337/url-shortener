export default class CachedUrlResponse {
    private longUrl:string
    private shortUrl:string
    private howManyTimeClicked: number
    constructor(longUrl:string, shortUrl:string, howManyTimeClicked:number){
        this.longUrl = longUrl
        this.shortUrl = shortUrl
        this.howManyTimeClicked = howManyTimeClicked
    }

    setHowManyTimeClicked(numberTransformation:number){
        this.howManyTimeClicked = numberTransformation
    }
    getHowManyTimeClicked(){
        return this.howManyTimeClicked
    }
}