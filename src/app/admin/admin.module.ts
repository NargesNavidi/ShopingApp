import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { DataTableModule } from 'angular5-data-table';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule,
    CustomFormsModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ])
  ],
  providers: [AdminAuthGuardService]
})
export class AdminModule {}
