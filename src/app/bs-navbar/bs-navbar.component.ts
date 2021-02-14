import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AppUser } from '../shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    // let cart$ = await this.shoppingCartService.getCart();
    // cart$.subscribe(cart => {
    //   this.ShoppingCartItemCount = 0;
    //   for (let productId in cart.items){
    //     this.ShoppingCartItemCount += cart.items[productId].quantity;
    //   }
    // });
    this.cart$ = await this.shoppingCartService.getCart();
  }
  logOut() {
    this.auth.logOut();
  }
}
