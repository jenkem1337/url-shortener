import ICommandHandler from './ICommandHandler';
import Command from './Command';
import IMediator from '../IMediator';
import BaseMediatorComponent from '../BaseMediatorCompnent';

export default class CommandDispatcher implements IMediator{
    
    private map: Map<string, ICommandHandler<Command,any>> = new Map<string, ICommandHandler<Command,any>>()
    private baseMediatorComponent:BaseMediatorComponent
    
    constructor(baseMediatorComponent:BaseMediatorComponent){
        this.baseMediatorComponent = baseMediatorComponent
        this.baseMediatorComponent.setCommandDispatcher(this)
    }
    
    dispatch(command: Command): any {
        let className = command as Object
        let commandHandler = this.map.get(className.constructor.name)
        if(!commandHandler){
            throw new Error('this command handler doesnt exist')
        }

        return commandHandler.execute(command)   
    }

    addService(command: string, commandHandler:ICommandHandler<Command,any>):CommandDispatcher{
        this.map.set(command, commandHandler)
        return this
    }
}