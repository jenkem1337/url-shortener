import BaseException from "./BaseException";
import HttpStatusCode from '../Service/ResponseModel/HttpStatus';

export default class UrlDoesntExistException extends BaseException{
    public constructor(){
        super('Url doesnt exist', HttpStatusCode.BAD_REQUEST)
    }
}