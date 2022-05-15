import BaseException from "./BaseException";
import HttpStatusCode from '../Service/ResponseModel/HttpStatus';

export class UUIDNullOrUndafined extends BaseException{
    constructor(){
        super('UUID null or undafined', HttpStatusCode.BAD_REQUEST)
    }
    
}