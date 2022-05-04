import BaseException from "./BaseException";
import HttpStatusCode from '../Service/ResponseModel/HttpStatus';

export default class LongUrlDoesntValidException extends BaseException{
    constructor(){
        super('Long url doesnt valid',HttpStatusCode.BAD_REQUEST)
    }
}