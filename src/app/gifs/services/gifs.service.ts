import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'Z3YHoe7UwRFC12NQZ3j0LnkZWItaxiMq';
  private _historial: string[] = [];
  public resulados: Gif[] = [];
  public servicioUrl : string = "https://api.giphy.com/v1/gifs"

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resulados = JSON.parse(localStorage.getItem('ultimoResultado')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set("q", query);

    console.log(params)

    this.http
      .get<SearchGIFResponse>(
        `${this.servicioUrl}/search`, {params}
      )
      .subscribe((resp) => {
        this.resulados = resp.data;
        localStorage.setItem('ultimoResultado', JSON.stringify(this.resulados));
      });
  }
}
