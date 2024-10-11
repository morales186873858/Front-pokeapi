import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private apiUrl = 'http://localhost:3000/api/pokemons'; // URL de tu API
    

    constructor(private http: HttpClient) { }


    getPokemons(limit: number, page: number, name?: string, type?: string , captured?: string): Observable<any> {
        let params = new HttpParams()
            .set('limit', limit.toString())
            .set('page', page.toString());

        if (name) {
            params = params.set('name', name);
        }

        if (type) {
            params = params.set('type', type);
        }
        if (captured) {
            params = params.set('captured', captured);
        }
        console.log(params);
        return this.http.get<any>(this.apiUrl, { params });
    }
    getPokemonCapturados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/captured`);
    }

  
    getCapturados(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/capturar/${id}`);
      }
    

      getLista(limit: number, currentPage: number): Observable<any[]> {
        const offset = (currentPage - 1) * limit;
        return this.http.get<any[]>(`${this.apiUrl}/all?limit=${limit}&offset=${offset}`);
      }   

      deletePokemon(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
      }

}