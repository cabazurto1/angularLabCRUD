import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product: Product = { id: 0, name: '', price: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    this.productService.getProducts().pipe(
      map(products => {
        // Find the highest ID and increment it
        const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
        this.product.id = maxId + 1;
      })
    ).subscribe(() => {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }
}
