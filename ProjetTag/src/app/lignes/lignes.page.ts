import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.page.html',
  styleUrls: ['./lignes.page.scss'],
})
export class LignesPage implements OnInit {
  color:string;
  dataLigne = [];

  constructor(private api:ApiService) { 
  }

  ngOnInit() {
    this.api.getData().subscribe(data=>{
      this.dataLigne = data;
    })
    
  }



}
