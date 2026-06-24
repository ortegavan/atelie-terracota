import { Component } from '@angular/core';
import { OrdersPageComponent } from './orders/orders-page/orders-page.component';

@Component({
  selector: 'app-root',
  imports: [OrdersPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
