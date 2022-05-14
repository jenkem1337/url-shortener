import Command from "./Command/Command"
import CommandDispatcher from "./Command/CommandDispatcher"
import QueryDispatcher from "./Query/QueryDispatcher"
import Query from './Query/Query';

export default abstract class BaseMediatorComponent{
    protected commandHandler: CommandDispatcher
    protected queryHandler: QueryDispatcher

    setCommandDispatcher(commandHandler: CommandDispatcher):void{
        this.commandHandler = commandHandler
    }
    setQueryDispatcher(queryHandler:QueryDispatcher):void{
        this.queryHandler = queryHandler
    }
}