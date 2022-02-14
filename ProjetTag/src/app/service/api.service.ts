import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = "https://data.mobilites-m.fr/api/routers/default/index/routes";
  urlDetail:string = "https://data.mobilites-m.fr/api/bbox/json?types=arret";
  constructor(private http: HttpClient) { }

  public getLigne():Observable <any>{
    return this.http.get(this.url);
  }

  public getDetailLigne():Observable <any>{
    return this.http.get(this.urlDetail);
  }
 
}
