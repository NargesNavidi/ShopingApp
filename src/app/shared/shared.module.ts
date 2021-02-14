import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AppRoutingModule } from '../app-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forChild([
      // routes for logged in users
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule {}
