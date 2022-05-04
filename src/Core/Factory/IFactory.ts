export default interface IFactory<Instance> {
    createInstance(...args: any[]): Instance
}