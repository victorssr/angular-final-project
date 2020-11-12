import { Moradia } from './../models/moradia';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent implements OnInit {
  moradia: Moradia;
  enderecoMapa;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.moradia = this.route.snapshot.data['casa'];
    this.enderecoMapa = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.obterEnderecoCompleto() + "&key={MAPS_API_KEY}");
  }

  obterEnderecoCompleto(): string {
    return `${this.moradia.endereco.logradouro}, ${this.moradia.endereco.numero} - ${this.moradia.endereco.bairro}, ${this.moradia.endereco.cidade}`;
  }
}
