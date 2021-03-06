import { Injectable }            from '@angular/core';
import { Observable }            from 'rxjs/Observable';
import { IProduct}               from '../models/product';
import { catchError, retry }       from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products')
      .pipe(retry(3), catchError(this.handleError));
  }

  public getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/products/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public saveProduct(product: IProduct): Observable<IProduct> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<IProduct>('/api/products', product, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updateProduct(id, product: IProduct): Observable<IProduct> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<IProduct>(`/api/products/${id}`, product, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteProduct(id): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<string>(`/api/products/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
