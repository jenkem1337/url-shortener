import BaseDispatcherContext from "../BaseDispatcherContext"
import IMediator from "../IMediator"
import IQueryHandler from "./IQueryHandler"
import Query from "./Query"

export default class QueryDispatcher implements IMediator{
    private map: Map<string, IQueryHandler<Query, any>> = new Map<string, IQueryHandler<Query, any>>()
    private baseDispatcherContext:BaseDispatcherContext
    
    constructor(baseDispatcherContext:BaseDispatcherContext ){
        
        this.baseDispatcherContext = baseDispatcherContext
        this.baseDispatcherContext.setQueryDispatcher(this)
    }
    
    dispatch(query: Query): any {
        let className = query as Object
        let queryHandler = this.map.get(className.constructor.name)
        if(!queryHandler){
            throw new Error('this query" handler doesnt exist')
        }
        return queryHandler.execute(query)   
    }

    addService(query:string, queryHandler: IQueryHandler<Query, any>):QueryDispatcher{
        this.map.set(query, queryHandler)
        return this
    }

}