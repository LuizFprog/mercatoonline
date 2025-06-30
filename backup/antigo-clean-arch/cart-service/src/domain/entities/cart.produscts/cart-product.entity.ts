// cart-service/src/domain/cart-product/entities/cart-product.entity.ts
import { Cart } from '../cart.entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'cart_products' })
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column({ name: 'product_id' })
  productId: number; // Referência ao Product, mas sem foreign key direta no microsserviço

  @Column()
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;
}