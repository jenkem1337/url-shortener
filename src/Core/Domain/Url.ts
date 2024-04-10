import validator from "validator";
import LongUrlInputEmptyException from '../Exception/LongUrlInputEmptyException';
import LongUrlDoesntValidException from '../Exception/LongUrlDoesntValidException';
import BaseEntity from "./BaseEntity";

export default class Url extends BaseEntity{    
    private urlCode: string

    private longUrl:string

    private shortUrl:string

    private howManyTimeClicked:number
    
    public constructor(id:string,longUrl: string, urlCode:string, shortUrl:string, howManyTimeClicked:number ,whenCreated: Date){
        super(id, whenCreated)
        
        this.isLongUrlEmpty(longUrl)
        this.isLongUrlValid(longUrl)

        this.longUrl = longUrl 
        this.urlCode = urlCode
        this.shortUrl = shortUrl
        this.howManyTimeClicked = howManyTimeClicked
    }

    private isLongUrlValid(longUrl:string){
        try {
            new URL(longUrl)
        } catch (error) {
            throw new LongUrlDoesntValidException()
        }
    }

    private isLongUrlEmpty(longUrl:string){
        if(!longUrl) {
            throw new LongUrlInputEmptyException()
        }
    }


    public incrementClickCounter():void{
        this.howManyTimeClicked += 1
    }


    public getLongUrl():string{
        return this.longUrl
    }


    public getHowMuchTimeClicked():number{
        return this.howManyTimeClicked
    }

    public getShortUrl():string{
        return this.shortUrl
    }

    public getUrlCode():string{
        return this.urlCode
    }
    
}