import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto): Promise<Order> {
    const total = dto.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const order = this.orders.create({ ...dto, total });
    return this.orders.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orders.find({ order: { createdAt: 'DESC' } });
  }
}
