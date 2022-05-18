import Command from '../Command/Command';
import IRequestStrategy from './IRequestStrategy';
import BaseMediatorComponent from '../BaseMediatorCompnent';
export default class CommandRequestStrategy extends BaseMediatorComponent implements IRequestStrategy{
    executeStrategy(obj: Object) {
        if(!(obj instanceof Command)){
            throw new Error('object is not command request objecet')
        }

        this.commandHandler.dispatch(obj)
    }

}