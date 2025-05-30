import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
 @Field(() => String)
 id!: string;

 @Field()
 name!: string;

 @Field()
 description!: string;

 @Field(() => Float)
 price!: number;

 @Field()
 image!: string;

 @Field()
 stripePriceId!: string;

 @Field(() => Boolean)
 isFeatured?: boolean;

 @Field(() => Date)
 createdAt!: Date;

 @Field(() => Date)
 updateAt!: Date;
}
