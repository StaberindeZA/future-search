import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, ValidateIf } from 'class-validator';

@InputType()
export class FindAllSearchInput {
  @ValidateIf((o) => !o.userId)
  @IsNotEmpty()
  @Field({ nullable: true })
  email: string | null;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @Field({ nullable: true })
  userId: string | null;
}
