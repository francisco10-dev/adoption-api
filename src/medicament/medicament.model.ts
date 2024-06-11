import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Table, Model, DataType, BelongsToMany } from "sequelize-typescript";
import { Dog } from "src/dog/dog.model";
import { DogMedicament } from "src/dogMedicament/dogMedicament.model";


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

    @Field(()=> Int)
    @Column
    cost: number;

    @BelongsToMany(() => Dog, () => DogMedicament)
    dogs: Dog[];
}