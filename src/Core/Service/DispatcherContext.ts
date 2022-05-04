import BaseDispatcherContext from "./BaseDispatcherContext";
import Command from "./Command/Command";
import Query from "./Query/Query";

export default class DispatcherContext extends BaseDispatcherContext{

    sendQuery(obj: Query):any{
        return this.queryHandler.dispatch(obj)

    }
    sendCommand(obj: Command):any{
        return this.commandHandler.dispatch(obj)
    }
}