import Query from "../Query/Query";
import IRequestStrategy from './IRequestStrategy';
import BaseMediatorComponent from '../BaseMediatorCompnent';

export default class QueryRequestStrategy extends BaseMediatorComponent implements IRequestStrategy{
    executeStrategy(obj: Object) {
        if (!(obj instanceof Query)){
            throw new Error('object is not query request object')
        }

        return this.queryHandler.dispatch(obj)
    }
    
}