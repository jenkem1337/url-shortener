import { DataSource } from "typeorm";
import ORM_Url from "../../Entity/ORM_Url";

export default class DatabaseConnection {
    private static databaseResourceInstance: DataSource

    private constructor(){}

    static getInstace(){
        if(!DatabaseConnection.databaseResourceInstance){
            DatabaseConnection.databaseResourceInstance = new DataSource({
                type: "postgres",
                host: process.env.POSTGRES_HOST,                                 
                port: new Number(process.env.POSTGRES_PORT).valueOf(),
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB_NAME,
                entities: [ORM_Url],
                synchronize: true
    
            })
            DatabaseConnection.databaseResourceInstance.initialize().then(()=>console.log('Data Source has been initialized')).catch(e => console.log(e))
     
        }
        return DatabaseConnection.databaseResourceInstance.manager
    }

    
}