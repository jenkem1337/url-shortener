import { Query } from "typeorm/driver/Query"
import Command from "./Command/Command"
import ICommandHandler from "./Command/ICommandHandler"
import IQueryHandler from "./Query/IQueryHandler"

export default interface IMediator{
    dispatch<TRequest extends Command | Query>(req: TRequest):any
    addService<THandler extends ICommandHandler<Command> | IQueryHandler<Query, any>>
        (req: string, handler: THandler):IMediator
    }