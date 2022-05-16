import { DataSource } from "typeorm";
import ORM_Url from "../../Entity/ORM_Url";

export default class DatabaseConnection {
    private static databaseResourceInstance: DataSource

    private constructor(){}

    static getInstace(){
        if(!DatabaseConnection.databaseResourceInstance){
            DatabaseConnection.databaseResourceInstance = new DataSource({
                type: "postgres",
                host: "localhost",                                 
                port: 5432,
                username: "postgres",
                password: "admin",
                database: "postgres",
                entities: [ORM_Url],
                synchronize: true
    
            })          
        }
        DatabaseConnection.databaseResourceInstance.initialize().then(()=>console.log('Data Source has been initialized')).catch(e => console.log(e))
        return DatabaseConnection.databaseResourceInstance
    }

    
}