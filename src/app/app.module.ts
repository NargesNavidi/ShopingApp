import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [ 
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    RouterModule.forRoot([
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent }
], { relativeLinkResolution: 'legacy' }),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
