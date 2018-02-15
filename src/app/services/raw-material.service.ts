import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { IRawMaterial}             from '../models/raw-material';
import { catchError, retry }       from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RawMaterialService {

  constructor(private http: HttpClient) {}

  public getRawMaterials(): Observable<IRawMaterial[]> {
    return this.http.get<IRawMaterial[]>('/api/raw-materials')
      .pipe(retry(3), catchError(this.handleError));
  }

  public getRawMaterial(id: string): Observable<IRawMaterial> {
    return this.http.get<IRawMaterial>(`/api/raw-materials/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  public saveRawMaterial(rawMaterial: IRawMaterial): Observable<IRawMaterial> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<IRawMaterial>('/api/raw-materials', rawMaterial, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updateRawMaterial(id, rawMaterial: IRawMaterial): Observable<IRawMaterial> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<IRawMaterial>(`/api/raw-materials/${id}`, rawMaterial, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteRawMaterial(id): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<string>(`/api/raw-materials/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
