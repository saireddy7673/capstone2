import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CsvComponent } from './csv/csv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderComponent } from './order/order.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ShellComponent } from './shared/shell/shell.component';
import { SignupComponent } from './signup/signup.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserComponent } from './user/user.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponFormComponent } from './coupons/coupon-form/coupon-form.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoryFormComponent,
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'products/form',
        component: ProductFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductFormComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/form',
        component: UserFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
      },
      {
        path: 'csv',
        component: CsvComponent,
      },
      {
        path:'coupons',
        component: CouponsComponent
      },
      {
        path:'coupons/form',
        component:CouponFormComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
