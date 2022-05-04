import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class ORM_Url extends BaseEntity{
    @PrimaryColumn()
    public id:string

    @Column({unique: true})
    public urlCode: string

    @Column()
    public longUrl:string

    @Column()
    public shortUrl:string

    @Column()
    public howMuchTimeClicked:number

    @Column()
    public created_at: Date;
    
    public constructor(id:string ,longUrl: string, urlcode:string, shortUrl:string, howMuchTimeClicked,created_at: Date){
        super()
        this.id = id
        this.longUrl = longUrl 
        this.urlCode = urlcode
        this.shortUrl = shortUrl
        this.created_at = created_at
        this.howMuchTimeClicked = howMuchTimeClicked

    }
}