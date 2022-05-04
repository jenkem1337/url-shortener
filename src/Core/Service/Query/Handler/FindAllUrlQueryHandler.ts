import IQueryHandler from "../IQueryHandler";
import FindAllUrlQuery from '../RequestModel/FindAllQuery';
import IUrlRepository from '../../../Interface/IUrlRepository';
import AllUrlResponse from "../../ResponseModel/AllUrlResponse";
import ApiResponse from '../../ResponseModel/ApiResponse';
import HttpStatusCode from '../../ResponseModel/HttpStatus';

export default class FindAllUrlQueryHandler implements IQueryHandler<FindAllUrlQuery, Promise<ApiResponse>>{

    private urlRepository: IUrlRepository

    constructor(urlRepository: IUrlRepository){
        this.urlRepository = urlRepository 
    }
    public async execute(query: FindAllUrlQuery): Promise<ApiResponse> {
        let allUrl = await this.urlRepository.findAll()
        let responseModel = allUrl.map((url) => new AllUrlResponse(url.getUuid(), url.getUrlCode(), url.getLongUrl(), url.getShortUrl(), url.getHowMuchTimeClicked(), url.getWhenCreated()))
        return new ApiResponse(HttpStatusCode.OK, responseModel)

    }
    
}

