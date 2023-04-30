export interface INews {
    id?:number;
    title:string;
    content:string;
    author_id?:number;
    created_at?:Date;
    updated_at?:Date;
    deleted_at?:Date;
}