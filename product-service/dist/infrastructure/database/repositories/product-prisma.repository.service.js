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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPrismaRepositoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProductPrismaRepositoryService = class ProductPrismaRepositoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                category: {
                    connect: {
                        id: data.categoryId
                    }
                }
            }
        });
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                category: true,
            }
        });
    }
    async findById(id) {
        return this.prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    async update(id, data) {
        return this.prisma.product.update({
            where: {
                id: id
            },
            data: data
        });
    }
    async delete(id) {
        return this.prisma.product.delete({
            where: {
                id: id
            }
        });
    }
    async findByPriceRange(data) {
        const { price1, price2 } = data;
        const whereClause = {
            AND: []
        };
        if (price1 !== undefined) {
            whereClause.AND.push({
                price: {
                    gte: price1
                }
            });
        }
        if (price2 !== undefined) {
            whereClause.AND.push({
                price: {
                    lte: price2
                }
            });
        }
        return this.prisma.product.findMany({
            where: whereClause,
            include: {
                category: {
                    select: { name: true }
                }
            }
        });
    }
    async findByCategory(id) {
        return await this.prisma.product.findMany({
            where: { categoryId: id },
        });
    }
};
exports.ProductPrismaRepositoryService = ProductPrismaRepositoryService;
exports.ProductPrismaRepositoryService = ProductPrismaRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductPrismaRepositoryService);
//# sourceMappingURL=product-prisma.repository.service.js.map