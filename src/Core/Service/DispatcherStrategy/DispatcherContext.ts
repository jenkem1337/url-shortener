import IRequestStrategy from './IRequestStrategy';
import CommandRequestStrategy from './CommandRequestStrategy';

export default class DispatcherContext {
    private strategyMap: Map<string, IRequestStrategy>


    constructor(mapObject: Map<string, IRequestStrategy>){
        this.strategyMap = mapObject
    }
    
    public sendToDispatcher(obj: Object){
        // parrentClass should return Command or Query (maybe Event).
        let parrentClass = Object.getPrototypeOf(obj).__proto__

        if(!this.strategyMap.has(parrentClass.constructor.name)){
            throw new Error('this key doesnt exist ')
        }

        let strategy = <IRequestStrategy> this.strategyMap.get(parrentClass.constructor.name)
     
        return strategy.executeStrategy(obj)
    }
        
}