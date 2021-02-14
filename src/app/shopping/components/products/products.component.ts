import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category: string;
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart(); // Used here because constructors cannot be async
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }
}
