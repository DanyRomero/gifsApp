import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'Z3YHoe7UwRFC12NQZ3j0LnkZWItaxiMq';
  private _historial: string[] = [];
  public resulados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get<SearchGIFResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=Z3YHoe7UwRFC12NQZ3j0LnkZWItaxiMq&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        this.resulados = resp.data;
      });
  }
}
