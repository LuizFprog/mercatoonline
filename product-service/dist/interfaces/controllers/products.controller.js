"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const create_product_1 = require("../../application/use-cases/create-product/create-product");
const find_product_all_1 = require("../../application/use-cases/find-product-all/find-product-all");
const find_product_by_id_1 = require("../../application/use-cases/find-product-by-id/find-product-by-id");
const find_product_catagory_1 = require("../../application/use-cases/find-product-catagory/find-product-catagory");
const find_product_price_1 = require("../../application/use-cases/find-product-price/find-product-price");
const delete_product_1 = require("../../application/use-cases/delete-product/delete-product");
const update_product_1 = require("../../application/use-cases/update-product/update-product");
const price_DTO_1 = require("../dtos/price.DTO/price.DTO");
const create_products_1 = require("../dtos/create.products/create.products");
const update_products_1 = require("../dtos/update.products/update.products");
let ProductsController = class ProductsController {
    constructor(createproducts, findproductsid, findall, findabyprice, findproductcategory, deleteproduct, updateproduct) {
        this.createproducts = createproducts;
        this.findproductsid = findproductsid;
        this.findall = findall;
        this.findabyprice = findabyprice;
        this.findproductcategory = findproductcategory;
        this.deleteproduct = deleteproduct;
        this.updateproduct = updateproduct;
    }
    findById(id) {
        return this.findproductsid.execute(id);
    }
    findByCaterory(id) {
        return this.findproductcategory.execute(id);
    }
    findAll() {
        return this.findall.execute();
    }
    findByPrice(price) {
        return this.findabyprice.execute(price);
    }
    createProducts(data) {
        return this.createproducts.execute(data);
    }
    updateProducts(id, data) {
        return this.updateproduct.execute(id, data);
    }
    DeleteProductService(id) {
        return this.deleteproduct.execute(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findByCaterory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('price'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_DTO_1.priceDTO]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findByPrice", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_products_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProducts", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_products_1.UpdateProductsDTO]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProducts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "DeleteProductService", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [create_product_1.CreateProductService,
        find_product_by_id_1.FindProductByIdService,
        find_product_all_1.FindProductAllService,
        find_product_price_1.FindProductPriceService,
        find_product_catagory_1.FindProductCatagoryService,
        delete_product_1.DeleteProductService,
        update_product_1.UpdateProductService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map