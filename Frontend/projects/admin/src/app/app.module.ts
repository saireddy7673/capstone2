import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CsvComponent } from './csv/csv.component';
import { SignupComponent } from './signup/signup.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponFormComponent } from './coupons/coupon-form/coupon-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoryFormComponent,
    ProductComponent,
    ProductFormComponent,
    UserComponent,
    UserFormComponent,
    OrderComponent,
    OrderDetailsComponent,
    LoginComponent,
    CsvComponent,
    SignupComponent,
    CouponsComponent,
    CouponFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
