import ErrorHandlingMiddleware from '../../Middleware/ErrorHandlingMiddleware';
import IFactory from '../IFactory';
export default class ErrorHandlingMiddlewareFactory implements IFactory<ErrorHandlingMiddleware>{
    createInstance(): ErrorHandlingMiddleware {
        return new ErrorHandlingMiddleware()
    }
    
}