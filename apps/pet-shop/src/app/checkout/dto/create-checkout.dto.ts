import { IsArray, IsNumber, ValidateNested} from 'class-validator'
import { Type } from 'class-transformer'


export class CartItemDto{
    productId!: string;

    @IsNumber()
    price!: number;
    quantity!:number;

    name!:string;
    stripePriceId!: string;
}
export class CreateCheckoutDto {
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => CartItemDto)
    items!: CartItemDto[];

    @IsNumber()
    totalAmount!:number
}
