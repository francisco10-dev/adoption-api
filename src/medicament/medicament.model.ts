import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Table, Model, DataType } from "sequelize-typescript";

@ObjectType()
@Table
export class Medicament extends Model{
    @Field(()=> Int)
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Field(()=> String)
    @Column
    name: string;

    @Field(()=> String)
    @Column
    supply: string;

    @Field(()=> String)
    @Column
    description: string;
}