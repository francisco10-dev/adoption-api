import { Field, ObjectType, GraphQLISODateTime, Int } from "@nestjs/graphql";
import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Dog } from "src/dog/dog.model";
import { User } from "src/users/user.model";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Table
export class Appointment extends Model {

    @Field(() => String)
    @Column({
        primaryKey: true,
        type: DataTypes.STRING(8),
        defaultValue: () => uuidv4().substr(0, 8),
    })
    id: string;

    @Field(() => String)
    @Column({
        allowNull: false,
        type: DataTypes.DATEONLY,
    })
    date: Date;

    @Field(() => String)
    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    hour: string;

    @Field(() => String, {
        nullable: true
    })
    @Column({
        type: DataTypes.STRING,
        allowNull: true,
    })
    comments: string;

    @ForeignKey(() => User)
    @Column({
        allowNull: false,
    })
    userId: number;

    @Field(() => User)
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Dog)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    dogId: number;

    @Field(() => Dog)
    @BelongsTo(() => Dog)
    dog: Dog;


}
