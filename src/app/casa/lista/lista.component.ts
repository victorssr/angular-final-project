import { CasaService } from './../services/casa.service';
import { Moradia } from './../models/moradia';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  moradias: Moradia[] = [];
  errorMessage: string;

  constructor(private casaService: CasaService) { }

  ngOnInit(): void {
    this.casaService.obterTodos()
      .subscribe(
        moradias => this.moradias = moradias,
        falha => this.errorMessage
      );
  }

}
