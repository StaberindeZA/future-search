import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, ValidateIf } from 'class-validator';

@InputType()
export class CreateSearchInput {
  @ValidateIf((o) => !o.userId)
  @IsNotEmpty()
  @Field({ nullable: true })
  email: string | null;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @Field({ nullable: true })
  userId: string | null;

  @Field()
  search: string;

  @Field()
  searchDate: Date;
}
