import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindOneSearchInput {
  @Field(() => ID)
  searchId: string;
}
