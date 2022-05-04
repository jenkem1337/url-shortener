import validator from "validator";
import LongUrlInputEmptyException from '../Exception/LongUrlInputEmptyException';
import LongUrlDoesntValidException from '../Exception/LongUrlDoesntValidException';
import BaseEntity from "./BaseEntity";

export default class Url extends BaseEntity{    
    private urlCode: string

    private longUrl:string

    private shortUrl:string

    private howMuchTimeClicked:number
    
    public constructor(id:string,longUrl: string, urlCode:string, shortUrl:string, howMuchTimeClicked:number ,whenCreated: Date){
        super(id, whenCreated)
        if(!longUrl){
            throw new LongUrlInputEmptyException()
        }
        if(!validator.isURL(longUrl)){
            throw new LongUrlDoesntValidException()
        }
        this.longUrl = longUrl 
        this.urlCode = urlCode
        this.shortUrl = shortUrl
        this.howMuchTimeClicked = howMuchTimeClicked
    }

    
    public incrementClickCounter():void{
        this.howMuchTimeClicked += 1
    }


    public getLongUrl():string{
        return this.longUrl
    }


    public getHowMuchTimeClicked():number{
        return this.howMuchTimeClicked
    }

    public getShortUrl():string{
        return this.shortUrl
    }

    public getUrlCode():string{
        return this.urlCode
    }
    
}