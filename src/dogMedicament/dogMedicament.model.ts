import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { Dog } from '../dog/dog.model';
import { Medicament } from '../medicament/medicament.model';

@ObjectType()
@Table
export class DogMedicament extends Model {
    @Field(() => Int)
    @ForeignKey(() => Dog)
    @Column
    dogId: number;

    @Field(() => Int)
    @ForeignKey(() => Medicament)
    @Column
    medicamentId: number;
}
