import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: string;
  order$;
  item;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrderById(this.orderId);
  }

  navigateBack() {
    this.location.back();
  }

  // total(totalPrice) {
  //   let sum = 0;
  //   sum += this.total()

  //   return sum;
  // }
}
