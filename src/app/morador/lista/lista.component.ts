import { environment } from './../../../environments/environment';
import { MoradorService } from './../services/morador.service';
import { Morador } from './../models/morador';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagesUrl: string = environment.urlImages;

  moradores: Morador[] = [];
  errorMessage: string;

  constructor(private moradorService: MoradorService) { }

  ngOnInit(): void {
    this.moradorService.obterTodos()
      .subscribe(
        moradores => this.moradores = moradores,
        falha => this.errorMessage
      );
  }

}
