import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Terrain } from '../models/terrain.model';
import { Categorie } from '../models/categorie.model';
import { authHeader } from './auth.header';
import {TaxeTNB} from "../models/taxetnb.model";
import { User } from '../models/user.model';

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

  register(username: string, email: string, password: string, cin: string, nom: string, prenom: string, adresse: string): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username,
      email,
      password,
      cin,
      nom,
      prenom,
      adresse
    }, httpOptions);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${AUTH_API}/findById/${id}`);
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
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${AUTH_API}/users`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }


  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(apiUrl + '/save', terrain);
  }

  getTerrainsByCIN(cin: string): Observable<any> {
    const headers = authHeader();
    return this.http.get(`${AUTH_API}/${cin}/terrains`, { headers });
  }


  getAllTerrains(): Observable<Terrain[]> {
    const url = `${apiUrl}/all`;
    return this.http.get<Terrain[]>(url);
  }

  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${apiUrl}/findById/${id}`);
  }

  saveTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${apiUrl}/save`, terrain);
  }

  updateTerrain(terrain: Terrain): Observable<number> {
    return this.http.post<number>(`${apiUrl}/update`, terrain);
  }

  deleteTerrain(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }

}
