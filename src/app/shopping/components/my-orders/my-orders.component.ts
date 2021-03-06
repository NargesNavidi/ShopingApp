import { switchMap } from 'rxjs/operators';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService, private auth: AuthService) {
    // this.orders$ = auth.user$.pipe(
    //   switchMap(u => orderService.getOrdersByUser(u.uid))
    // );
  }

  ngOnInit() {
    this.orders$ = this.auth.user$.pipe(
      switchMap(user => {
        return this.orderService.getOrdersByUser(user.uid);
      })
    );
  }
}
