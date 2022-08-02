import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IProduct } from "../product";
import { ProductService } from "../product.service";

@Component({
    selector: "pm-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = "Product Detail";
    product: IProduct | undefined;
    sub!: Subscription;
    errorMessage: string = "";

    constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get("id"));
        this.pageTitle += ` : ${id}`;

        this.sub = this.productService.getProduct(id).subscribe({
            next: products => {
                this.product = products;
            },
            error: err => (this.errorMessage = err),
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onBack(): void {
        this.router.navigate(["/products"]);
    }
}
