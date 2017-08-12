import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct} from '../models/product';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

  constructor(private http: Http) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get('/api/products').map((response: Response) => {
      return <IProduct[]>response.json();
    }).catch(this.handleError);
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get(`/api/products/${id}`).map((response: Response) => {
      return <IProduct>response.json();
    }).catch(this.handleError);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers});
    return this.http.post('/api/products', product, options).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  updateProduct(id, product: IProduct): Observable<IProduct> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers});
    return this.http.put(`/api/products/${id}`, product, options).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  deleteProduct(id): Observable<IProduct> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers});
    return this.http.delete(`/api/products/${id}`, options).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
