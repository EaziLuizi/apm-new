import { Component, OnInit } from "@angular/core";
import { filter, Observable, Subscription } from "rxjs";
import { IProduct } from "../product";
import { ProductService } from "../product.service";

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    sub!: Subscription;

    constructor(private productService: ProductService) {}

    private _listFilter: string = "";
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log("In setter:" + value);
        this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    ngOnInit(): void {
        this.listFilter = "";

        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => (this.errorMessage = err),
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(msg: string): void {
        this.pageTitle = "Product List: " + msg;
    }
}
