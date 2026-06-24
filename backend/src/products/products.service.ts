import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

const SEED_PRODUCTS = [
  { name: 'Tigela de grês esmaltada', price: 89.9 },
  { name: 'Vaso torneado terracota', price: 145.0 },
  { name: 'Caneca rústica de barro', price: 65.0 },
  { name: 'Travessa de cerâmica pintada à mão', price: 210.0 },
  { name: 'Jarra de barro queimado', price: 175.0 },
  { name: 'Prato de sobremesa em porcelana rústica', price: 95.0 },
];

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.products.count();
    if (count === 0) {
      await this.products.save(SEED_PRODUCTS);
    }
  }

  findAll(): Promise<Product[]> {
    return this.products.find();
  }
}
