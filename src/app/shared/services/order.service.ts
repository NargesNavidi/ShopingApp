import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  // getOrders() {
  //   return this.db
  //     .list('/orders')
  //     .snapshotChanges()
  //     .pipe(
  //       map(data => {
  //         return data.map(action => {
  //           let key = action.payload.key;
  //           let data = { key, ...action.payload.val() };
  //           return data;
  //         });
  //       })
  //     );
  // }

  getOrders() {
    return this.db.list('/order').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/orders', query => query.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  // getOrdersByUser(userId: string) {
  //   return this.db
  //     .list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
  //     .snapshotChanges()
  //     .pipe(
  //       map(data => {
  //         return data.map(action => {
  //           let key = action.payload.key;
  //           let data = { key, ...action.payload.val() };
  //           return data;
  //         });
  //       })
  //     );
  // }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  deleteOrder(id: string) {
    return this.db.list('/orders/' + id).remove();
  }
}
