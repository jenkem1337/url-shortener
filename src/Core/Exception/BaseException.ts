import HttpStatusCode from '../Service/ResponseModel/HttpStatus';
export default abstract class BaseException extends Error{
    public message:any
    public statusCode: number
    public constructor(message:any,statusCode: number){
        super(message)
        this.statusCode = statusCode
    }

}