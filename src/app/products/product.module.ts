import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConvertToSpacesPipe } from "../shared/convert-to-spaces.pipe";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductDetailGuard } from "./product-detail/product-detail.guard";
import { ProductListComponent } from "./product-list/product-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [ProductListComponent, ProductDetailComponent, ConvertToSpacesPipe],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: "products", component: ProductListComponent },
            { path: "products/:id", component: ProductDetailComponent, canActivate: [ProductDetailGuard] },
        ]),
        SharedModule,
    ],
})
export class ProductModule {}
