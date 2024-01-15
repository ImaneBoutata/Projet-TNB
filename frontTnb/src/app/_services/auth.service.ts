import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Terrain } from '../models/terrain.model';
import { Categorie } from '../models/categorie.model';
import { authHeader } from './auth.header';
import {TaxeTNB} from "../models/taxetnb.model";

const AUTH_API = 'http://localhost:8094/api/auth';
const apiUrl = 'http://localhost:8084/terrain';
const categoriurl = 'http://localhost:8084/categorie';
const taxeUrl = 'http://localhost:8085/taxe-tnb';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username,
      email,
      password
    }, httpOptions);
  }


  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${categoriurl}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      })
    );
  }

  findHistoriqueByCIN(cin: string): Observable<TaxeTNB[]> {
    return this.http.get<TaxeTNB[]>(AUTH_API+`/findHistoriqueByCIN/${cin}`);
  }

  findAllTaxes(): Observable<TaxeTNB[]> {
      return this.http.get<TaxeTNB[]>(taxeUrl+"/all");
  }

  saveTax(taxeTNB: TaxeTNB): Observable<TaxeTNB> {
    return this.http.post<TaxeTNB>(taxeUrl+`/save`, taxeTNB);
  }

  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(apiUrl + '/save', terrain);
  }

  getTerrainsByCIN(cin: string): Observable<any> {
    const headers = authHeader();
    return this.http.get(`${AUTH_API}/${cin}/terrains`, { headers });
  }

  postTaxes(params: any){
    return this.http.post(taxeUrl+"/save", params);
  }

}
