import { environment } from './../../../environments/environment';
import { Morador } from './../../morador/models/morador';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moradores-lista',
  templateUrl: './moradores-lista.component.html'
})
export class MoradoresListaComponent implements OnInit {

  @Input()
  moradores: Morador[] = [];

  imagesUrl = environment.urlImages;

  constructor() { }

  ngOnInit(): void {
  }

}
