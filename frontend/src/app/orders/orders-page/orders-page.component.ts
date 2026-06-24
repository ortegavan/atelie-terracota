import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Order, OrderItem, OrdersService, Product } from '../orders.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
  imports: [ReactiveFormsModule, DatePipe],
})
export class OrdersPageComponent {
  private readonly ordersService = inject(OrdersService);

  readonly products = signal<Product[]>([]);
  readonly orderItems = signal<OrderItem[]>([]);
  readonly orders = signal<Order[]>([]);
  readonly submitting = signal(false);
  readonly submitted = signal(false);

  readonly total = computed(() =>
    this.orderItems().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );

  readonly orderForm = new FormGroup({
    customerName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    customerEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  readonly addItemForm = new FormGroup({
    productId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  constructor() {
    this.ordersService.getProducts().subscribe(p => this.products.set(p));
    this.ordersService.getOrders().subscribe(o => this.orders.set(o));
  }

  addItem(): void {
    if (this.addItemForm.invalid) return;
    const { productId, quantity } = this.addItemForm.getRawValue();
    const numericId = Number(productId);
    const product = this.products().find(p => p.id === numericId);
    if (!product) return;
    if (this.orderItems().some(i => i.productId === numericId)) return;
    this.orderItems.update(items => [
      ...items,
      {
        productId: numericId,
        productName: product.name,
        quantity,
        unitPrice: parseFloat(product.price),
      },
    ]);
    this.addItemForm.reset({ quantity: 1 });
  }

  removeItem(productId: number): void {
    this.orderItems.update(items => items.filter(i => i.productId !== productId));
  }

  submitOrder(): void {
    if (this.orderForm.invalid || this.orderItems().length === 0) return;
    this.submitting.set(true);
    const { customerName, customerEmail } = this.orderForm.getRawValue();
    this.ordersService
      .createOrder({ customerName, customerEmail, items: this.orderItems() })
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.orderItems.set([]);
          this.orderForm.reset();
          this.ordersService.getOrders().subscribe(o => this.orders.set(o));
          this.submitting.set(false);
        },
        error: () => this.submitting.set(false),
      });
  }
}
