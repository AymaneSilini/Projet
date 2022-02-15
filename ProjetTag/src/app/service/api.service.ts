import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = "https://data.mobilites-m.fr/api/routers/default/index/routes";
  urlDetail:string = "https://data.mobilites-m.fr/api/bbox/json?types=arret";
  //recupération des points de parcours pour les trams
  urlTramA:string ="https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=SEM_A";
  urlTramB:string ="https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=SEM_B";
  urlTramC:string ="https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=SEM_C"
  urlTramD:string ="https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=SEM_D"
  urlTramE:string ="https://data.mobilites-m.fr/api/lines/json?types=ligne&codes=SEM_E"
  urlInfo: string = "https://data.mobilites-m.fr/api/ficheHoraires/json?route=SEM:";
 

  ligne:string;


  constructor(private http: HttpClient) { 
  }

  public getLigne():Observable <any>{
    return this.http.get(this.url);
  }
  public getDetailLigne():Observable <any>{
    return this.http.get(this.urlDetail);
  }
  public getTramA():Observable <any>{
    return this.http.get(this.urlTramA);
  }
  public getTramB():Observable <any>{
    return this.http.get(this.urlTramB);
  }
  public getTramC():Observable <any>{
    return this.http.get(this.urlTramC);
  }
  public getTramD():Observable <any>{
    return this.http.get(this.urlTramD);
  }
  public getTramE():Observable <any>{
    return this.http.get(this.urlTramE);
  }

  public getInfo():Observable <any>{
    return this.http.get(this.urlInfo);
  }


 
}
