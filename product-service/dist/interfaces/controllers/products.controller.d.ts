import { CreateProductService } from 'src/application/use-cases/create-product/create-product';
import { FindProductAllService } from 'src/application/use-cases/find-product-all/find-product-all';
import { FindProductByIdService } from 'src/application/use-cases/find-product-by-id/find-product-by-id';
import { FindProductCatagoryService } from 'src/application/use-cases/find-product-catagory/find-product-catagory';
import { FindProductPriceService } from 'src/application/use-cases/find-product-price/find-product-price';
import { DeleteProductService } from 'src/application/use-cases/delete-product/delete-product';
import { UpdateProductService } from 'src/application/use-cases/update-product/update-product';
import { priceDTO } from 'src/interfaces/dtos/price.DTO/price.DTO';
import { CreateProductDto } from 'src/interfaces/dtos/create.products/create.products';
import { UpdateProductsDTO } from 'src/interfaces/dtos/update.products/update.products';
export declare class ProductsController {
    private createproducts;
    private findproductsid;
    private findall;
    private findabyprice;
    private findproductcategory;
    private deleteproduct;
    private updateproduct;
    constructor(createproducts: CreateProductService, findproductsid: FindProductByIdService, findall: FindProductAllService, findabyprice: FindProductPriceService, findproductcategory: FindProductCatagoryService, deleteproduct: DeleteProductService, updateproduct: UpdateProductService);
    findById(id: number): any;
    findByCaterory(id: number): any;
    findAll(): any;
    findByPrice(price: priceDTO): any;
    createProducts(data: CreateProductDto): any;
    updateProducts(id: number, data: UpdateProductsDTO): any;
    DeleteProductService(id: number): any;
}
