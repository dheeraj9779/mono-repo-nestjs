import { ObjectType, Field, Float } from '@nestjs/graphql';
import { OrderItem } from './order-item-entity';
import { OrderStatus } from '../../../generated/prisma';

@ObjectType()
export class Order {
    @Field(() => String)
    id!: string;
  
    @Field(() => [OrderItem])
    items!: OrderItem[];
  
    @Field(() => Float)
    totalAmount!: number;
  
    @Field(() => String)
    status!: OrderStatus;
  
    @Field(() => String, {nullable: true})
    paymentId?: string;
  
    @Field(() => Date)
    createdAt!: Date;

    @Field(() => Date)
    updateAt!: Date;
}
