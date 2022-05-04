import IFactory from './IFactory';


export default class FactoryCreator{

    private static factory :IFactory<any>

    public static initFactory<T>(factory:IFactory<T>): T{
        this.factory = factory
        return this.factory.createInstance()
    }

}