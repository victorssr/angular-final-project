import { environment } from './../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Morador } from './../models/morador';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {

  morador: Morador;
  urlImages = environment.urlImages;

  constructor(private activatedRoute: ActivatedRoute) {
    this.morador = this.activatedRoute.snapshot.data['morador'];
   }

  ngOnInit(): void {
  }

}
