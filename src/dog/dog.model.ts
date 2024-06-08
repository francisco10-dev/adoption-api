import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Table, Model, DataType } from "sequelize-typescript";

@ObjectType()
@Table
export class Dog extends Model{
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
    condition: string;

    @Field(()=> String)
    @Column
    description: string;

    @Field(()=> String)
    @Column
    status: string;

    @Field(()=> String, {nullable: true})
    @Column(DataType.TEXT('long'))
    photo: string;
}