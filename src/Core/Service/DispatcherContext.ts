import IRequestStrategy from './DispatcherStrategy/IRequestStrategy';

export default class DispatcherContext {
    private strategyMap: Map<string, IRequestStrategy>


    public sendToDispatcher(strategyName,obj: Object){
        if(!this.strategyMap.has(strategyName)){
            throw new Error('this strategy doesnt exist')
        }

        let strategy = <IRequestStrategy> this.strategyMap.get(strategyName)
        return strategy.executeStrategy(obj)
    }

    setStrategies(mapObject: Map<string, IRequestStrategy>){
        this.strategyMap = mapObject

    }
    
    
}