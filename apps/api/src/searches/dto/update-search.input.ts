import { CreateSearchInput } from './create-search.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSearchInput extends PartialType(CreateSearchInput) {
  @Field(() => ID)
  id: string;
}
