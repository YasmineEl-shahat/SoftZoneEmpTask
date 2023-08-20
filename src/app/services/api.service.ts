import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_url = 'http://task.soft-zone.net/api';

  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  constructor(private _httpClient: HttpClient) {}

  get(url: string) {
    return this._httpClient.get(`${this.api_url}/${url}`, {
      headers: this.headers,
    });
  }

  getById(url: string, id: any) {
    return this._httpClient.get(`${this.api_url}/${url}/${id}`, {
      headers: this.headers,
    });
  }

  post(url: string, body: any) {
    return this._httpClient.post(`${this.api_url}/${url}`, body, {
      headers: this.headers,
    });
  }

  patch(url: string, id: any, body: any) {
    return this._httpClient.patch(`${this.api_url}/${url}/${id}`, body, {
      headers: this.headers,
    });
  }

  delete(url: string, id: any) {
    return this._httpClient.delete(`${this.api_url}/${url}/${id}`, {
      headers: this.headers,
    });
  }
}
