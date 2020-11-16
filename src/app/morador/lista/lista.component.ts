import { MoradorService } from './../services/morador.service';
import { Morador } from './../models/morador';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  moradores: Morador[];

  constructor(private moradorService: MoradorService) { }

  ngOnInit(): void {
    this.moradorService.obterTodos()
      .subscribe(() => {
        sucesso => this.moradores = sucesso;
      });
  }

}
