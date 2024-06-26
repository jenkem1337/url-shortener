import Url from "../../../Core/Domain/Url";
import UrlDoesntExistException from "../../../Core/Exception/UrlDoesntExistException";
import IFactory from "../../../Core/Factory/IFactory";
import IUrlRepository from "../../../Core/Interface/IUrlRepository";
import ORM_Url from '../../Entity/ORM_Url';
import { DataSource, EntityManager } from 'typeorm';

export default class UrlRepository implements IUrlRepository{

    private urlFactory: IFactory<Url>
    private entityManager: EntityManager

    constructor(urlFactory: IFactory<Url>, entityManager: EntityManager){
        this.urlFactory = urlFactory
        this.entityManager = entityManager
    }
    async findAll(): Promise<Url[]> {
        let allUrl  = await this.entityManager.find(ORM_Url,{
            order: {
                created_at: "DESC"
            }
        })

        let urlDomainObjects = allUrl.map(url => this.urlFactory.createInstance(url.id, url.longUrl, url.urlCode, url.shortUrl, url.howMuchTimeClicked, url.created_at))
        return urlDomainObjects
    }
    async saveChanges(url: Url): Promise<void> {
        let orm_Url = new ORM_Url(url.getUuid(), url.getLongUrl(), url.getUrlCode(),url.getShortUrl(), url.getHowMuchTimeClicked(), url.getWhenCreated())
        await this.entityManager.save(orm_Url)

    }
    async findByUrlCode(urlCode: string): Promise<Url> {
        try {
            let orm_Url = await this.entityManager.findOne(ORM_Url,{where:{urlCode: urlCode}})

            return this.urlFactory.createInstance(orm_Url.id, orm_Url.longUrl, orm_Url.urlCode, orm_Url.shortUrl, orm_Url.howMuchTimeClicked ,orm_Url.created_at)
        } catch (error) {
            // i think this is a bad code but working :P
            false
        }
    }

    
}