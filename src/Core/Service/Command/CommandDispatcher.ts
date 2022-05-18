import ICommandHandler from './ICommandHandler';
import Command from './Command';
import IMediator from '../IMediator';
import BaseMediatorComponent from '../BaseMediatorCompnent';

export default class CommandDispatcher implements IMediator{
    
    private map: Map<string, ICommandHandler<Command>> = new Map<string, ICommandHandler<Command>>()
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

        commandHandler.execute(command)   
    }

    addService(command: string, commandHandler:ICommandHandler<Command>):CommandDispatcher{
        this.map.set(command, commandHandler)
        return this
    }
}