import { uuid } from 'uuidv4';
import { UUIDNullOrUndafined } from '../Exception/UUIDNullOrUndafined';
export default abstract class BaseEntity{

    private uuid: string
    private whenCreated: Date

    constructor(uuid: string, whenCreated: Date){
        if(!uuid){
            throw new UUIDNullOrUndafined()
        }
        this.uuid = uuid
        this.whenCreated = whenCreated
    }
    
    public getUuid(): string {
        return this.uuid;
    }

    public getWhenCreated(): Date {
        return this.whenCreated;
    }

}