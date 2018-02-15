import { Injectable }            from '@angular/core';
import { Observable }            from 'rxjs/Observable';
import { IIngredient}               from '../models/ingredient';
import { catchError, retry }       from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IngredientService {

  constructor(private http: HttpClient) {}

  public getIngredients(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>('/api/ingredients')
      .pipe(retry(3), catchError(this.handleError));
  }

  public getIngredient(id: string): Observable<IIngredient> {
    return this.http.get<IIngredient>(`/api/ingredients/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public getIngredientsByIds(ids: string[]): Observable<IIngredient[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<IIngredient[]>(`/api/ingredients/get-by-ids`, ids, httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  public saveIngredient(ingredient: IIngredient): Observable<IIngredient> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<IIngredient>('/api/ingredients', ingredient, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updateIngredient(id, ingredient: IIngredient): Observable<IIngredient> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<IIngredient>(`/api/ingredients/${id}`, ingredient, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteIngredient(id): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<string>(`/api/ingredients/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
