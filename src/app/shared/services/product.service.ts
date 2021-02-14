import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  // getAll() {
  //     return this.db
  //       .list('/products')
  //       .snapshotChanges()
  //       .pipe(
  //         map((products: any[]) =>
  //           products.map(prod => {
  //             const payload = prod.payload.val();
  //             const key = prod.key;
  //             return <any>{ key, ...payload };
  //           })
  //         )
  //       );
  //   }

  getAll(): Observable<Product[]> {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
