import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Search {
  @Field(() => ID)
  id: string;

  @Field()
  search: string;

  @Field()
  searchDate: Date;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}
