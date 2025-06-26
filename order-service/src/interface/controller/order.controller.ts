import { Controller,Get, Param,Post,Body,Delete } from '@nestjs/common';


@Controller('order-controller')
export class OrderController {


    @Get(':id')
    findById(@Param("id") id:number){
        return "return id" + id.toString()
    }

    @Get()
    findAll(){
        return "All orders"
    }
    
    @Post()
    createOrder(@Body() body:any){
        return "body"
    }

    @Delete(":id")
    DeleteOrder(@Param("id") id: number){
        return "delete order"

    }
}
