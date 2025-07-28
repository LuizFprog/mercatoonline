import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


export class PaymentPix {
  
  id: number;
  code: string;
  datePayment: Date;
}