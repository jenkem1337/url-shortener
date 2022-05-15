export default class SavedUrlResponse{
    private id: string
    private urlCode: string
    private longUrl:string
    private shortUrl:string
    private howManyTimeClicked:number
    private created_at: Date;

    constructor( id: string,urlCode: string,longUrl:string,shortUrl:string,howManyTimeClicked:number,created_at: Date){
        this.id = id
        this.created_at = created_at
        this.longUrl = longUrl
        this.shortUrl = shortUrl
        this.howManyTimeClicked = howManyTimeClicked
        this.urlCode = urlCode
    }


}