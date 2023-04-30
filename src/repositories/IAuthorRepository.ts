import { IAuthor } from "../types/IAuthor";

export interface IAuthorRepository {
    create(data:IAuthor):Promise<IAuthor>;
    signin(email:string, password:string): Promise<string>;
    findByEmail(email:string):Promise<IAuthor>
}