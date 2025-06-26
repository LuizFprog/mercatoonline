import { CreateOrderDto } from 'src/interface/dtos/create-order.dto'

export const IOrderProductService = Symbol('IOrderProductService');

export interface IOrderProductService{
    create(data:CreateOrderDto);
    delete(id:number);
    findbyId(id:number);
    findall();
}