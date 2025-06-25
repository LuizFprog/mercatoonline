"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const product_repository_interface_1 = require("../../domain/repository/product.repository.interface");
const product_prisma_repository_service_1 = require("../database/repositories/product-prisma.repository.service");
const products_controller_1 = require("../../interfaces/controllers/products.controller");
const create_product_1 = require("../../application/use-cases/create-product/create-product");
const delete_product_1 = require("../../application/use-cases/delete-product/delete-product");
const find_product_all_1 = require("../../application/use-cases/find-product-all/find-product-all");
const find_product_by_id_1 = require("../../application/use-cases/find-product-by-id/find-product-by-id");
const find_product_catagory_1 = require("../../application/use-cases/find-product-catagory/find-product-catagory");
const find_product_price_1 = require("../../application/use-cases/find-product-price/find-product-price");
const update_product_1 = require("../../application/use-cases/update-product/update-product");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [
            products_controller_1.ProductsController,
        ],
        providers: [
            {
                provide: product_repository_interface_1.IProductRepository,
                useClass: product_prisma_repository_service_1.ProductPrismaRepositoryService,
            },
            create_product_1.CreateProductService,
            delete_product_1.DeleteProductService,
            find_product_all_1.FindProductAllService,
            find_product_by_id_1.FindProductByIdService,
            find_product_catagory_1.FindProductCatagoryService,
            find_product_price_1.FindProductPriceService,
            update_product_1.UpdateProductService,
        ],
    })
], ProductsModule);
//# sourceMappingURL=products-module.js.map