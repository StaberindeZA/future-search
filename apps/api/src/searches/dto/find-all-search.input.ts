import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindAllSearchInput {
  @Field(() => ID)
  userId: string;
}
