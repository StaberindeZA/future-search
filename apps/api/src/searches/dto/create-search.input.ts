import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSearchInput {
  @Field()
  search: string;

  @Field()
  searchDate: Date;

  @Field()
  email: string;
}
