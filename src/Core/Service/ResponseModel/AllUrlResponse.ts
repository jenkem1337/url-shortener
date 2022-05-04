export default class AllUrlResponse{
    
    private id:string
    private urlCode: string
    private longUrl:string
    private shortUrl:string
    private howMuchTimeClicked:number
    private created_at: Date;

    constructor( id: string,urlCode: string,longUrl:string,shortUrl:string,howMuchTimeClicked:number,created_at: Date){
        this.id = id
        this.urlCode = urlCode
        this.longUrl = longUrl
        this.shortUrl = shortUrl
        this.howMuchTimeClicked = howMuchTimeClicked
        this.created_at = created_at

    }



}