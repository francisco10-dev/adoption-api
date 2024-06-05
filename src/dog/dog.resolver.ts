import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';
import { DogService } from './dog.service';
import { Dog } from './dog.model';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(of => Dog)
export class DogResolver{
    constructor(private readonly dogService: DogService){}

    @Query(returns => [Dog])
    async dogs(): Promise <Dog[]>{
        return this.dogService.findAll();
    }

    @Query(returns => Dog)
    async dog(@Args('id', { type: () => Int }) id: number): Promise<Dog>{
        return this.dogService.findOne(id);
    }

    @Mutation(returns => Dog)
    async createDog(
        @Args('createDogInput') createDogInput: CreateDogInput,
        @Args('foto', { type: () => GraphQLUpload, nullable: true }) foto: GraphQLUpload,
    ): Promise<Dog> {
        return this.dogService.create(createDogInput, foto);
    }

    @Mutation(returns => Dog)
    async updateDog(@Args('updateDogInput') updateDogInput: UpdateDogInput): Promise <Dog>{
        return this.dogService.update(updateDogInput.id, updateDogInput);
    }

    @Mutation(returns => Boolean)
    async deleteDog(@Args('id', { type: ()=> Int }) id: number): Promise<boolean>{
        return this.dogService.delete(id);
    }
}