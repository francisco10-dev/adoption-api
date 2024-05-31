import { Int, ObjectType, Field } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table
export class User extends Model {

  @Field(() => Int)
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field(() => String)
  @Column({
    allowNull: false
  })
  name: string;

  @Field(() => String)
  @Column({
    allowNull: false
  })
  role: string;

  @Field(() => String)
  @Column({
    unique: true,
    allowNull: false
  })
  email: string;

  @Field(() => String)
  @Column({
    allowNull: false
  })
  password: string;

  @Field(() => String)
  @Column
  phone: string;

  @Field(() => String)
  @Column
  address: string;
}
