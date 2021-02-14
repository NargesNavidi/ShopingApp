import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // item$;

  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db
      .list('/shopping-carts')
      .push({ dateCreated: new Date().getTime() });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }
  // private getOrCreateCart() {
  //   let cartId = localStorage.getItem('cartId');
  //   if (!cartId) {
  //     this.create().then(result => {
  //       localStorage.setItem('cartId', result.key);
  //       return this.getCart(result.key);
  //     });
  //   } else return this.getCart(cartId);
  // }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        let quantity = (data ? data.quantity || 0 : 0) + change; // Used || to avoid null reference error

        if (!quantity) item$.remove();
        else
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity
          });
      });
  }
}
// async addToCart(product: Product) {
//   let cartId = await this.getOrCreateCartId();
//   let item$ = this.getItem(cartId, product.key);

//   item$
//     .valueChanges() // convert firebase object to observable
//     .pipe(take(1)) // take 1 instance of an item
//     .subscribe((item: any) => {
//       // $exists() is deprecated. Just check if item is truthy.
//        if(item)
//           item$.update({ quantity: item.quantity + 1 });
//       // since key and value are the same (eg, product: product) you can omit the value part.
//        else item$.set({product, quantity: 1 });
//    });
// }
