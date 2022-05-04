import BaseException from './BaseException';
import HttpStatusCode from '../Service/ResponseModel/HttpStatus';
export default class LongUrlInputEmptyException extends BaseException{
    public constructor(){
        super('Long url input empty', HttpStatusCode.BAD_REQUEST)
    }
}