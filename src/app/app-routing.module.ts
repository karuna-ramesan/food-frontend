import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFoodItemsComponent } from './all-food-items/all-food-items.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ViewFoodItemComponent } from './view-food-item/view-food-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path:'',component:AllFoodItemsComponent},
  { path:'cart',component:CartComponent},
  { path:'wishlist',component:WishlistComponent},
  { path:'view-food-item/:id',component:ViewFoodItemComponent },
  { path:'checkout',component:CheckoutComponent},

  { path:'**',component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
