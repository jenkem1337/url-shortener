import CommandDispatcher from "./Command/CommandDispatcher"
import QueryDispatcher from "./Query/QueryDispatcher"

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