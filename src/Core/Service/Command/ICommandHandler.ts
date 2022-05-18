import Command from "./Command";

export default interface ICommandHandler<TCommand extends Command>{
    execute(command: TCommand):void
}