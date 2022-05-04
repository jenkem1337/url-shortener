import Command from "./Command";

export default interface ICommandHandler<TCommand extends Command, TResponse>{
    execute(command: TCommand):TResponse
}