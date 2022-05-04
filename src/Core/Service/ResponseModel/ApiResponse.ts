
export default class ApiResponse{
    private statusCode: number
    private resultObject: object

    constructor(statusCode: number, resultObject: object){
        this.statusCode = statusCode
        this.resultObject = resultObject
    }

    getStatusCode(): number{
        return this.statusCode
    }

    getResult():object {
        return this.resultObject
    }
}