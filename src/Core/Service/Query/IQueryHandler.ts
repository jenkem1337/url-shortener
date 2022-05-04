import Query from "./Query";

export default interface IQueryHandler<TQuery extends Query, TResponse>{
    execute(query: TQuery):TResponse
}       