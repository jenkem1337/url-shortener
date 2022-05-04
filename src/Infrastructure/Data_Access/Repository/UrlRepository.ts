import Url from "../../../Core/Domain/Url";
import UrlDoesntExistException from "../../../Core/Exception/UrlDoesntExistException";
import IUrlRepository from "../../../Core/Interface/IUrlRepository";
import ORM_Url from '../../Entity/ORM_Url';

export default class UrlRepository implements IUrlRepository{
    async findAll(): Promise<Url[]> {
        let allUrl  = await ORM_Url.find({
            order: {
                created_at: "DESC"
            }
        })

        let urlDomainObjects = allUrl.map(url => new Url(url.id, url.longUrl, url.urlCode, url.shortUrl, url.howMuchTimeClicked, url.created_at))
        return urlDomainObjects
    }
    async saveAndChanges(url: Url): Promise<void> {
        let orm_Url = new ORM_Url(url.getUuid(), url.getLongUrl(), url.getUrlCode(),url.getShortUrl(), url.getHowMuchTimeClicked(), url.getWhenCreated())
        await orm_Url.save()
    }
    async findByUrlCode(urlCode: string): Promise<Url> {
        try {
            let orm_Url = await ORM_Url.findOne({where:{urlCode: urlCode}})
            return new Url(orm_Url.id, orm_Url.longUrl, orm_Url.urlCode, orm_Url.shortUrl, orm_Url.howMuchTimeClicked ,orm_Url.created_at)
        } catch (error) {
            throw new UrlDoesntExistException()
        }
    }
}