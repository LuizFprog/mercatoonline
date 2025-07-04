import { CreateOrderDto } from 'src/interface/dtos/create-order.dto'

export const IOrderRepositoryService = Symbol('IOrderProductService');

export interface IOrderRepository{
    create(data:CreateOrderDto);
    delete(id:number);
    findbyId(id:number);
    findall();
}