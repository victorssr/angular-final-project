import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CasaService } from './../services/casa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Moradia } from '../models/moradia';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent implements OnInit {

  errors: string[] = [];

  moradia: Moradia;
  enderecoMapa;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private casaService: CasaService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.moradia = this.route.snapshot.data['casa'];
    this.enderecoMapa = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.obterEnderecoCompleto() + "&key={MAPS_API_KEY}");
  }

  obterEnderecoCompleto(): string {
    return `${this.moradia.endereco.logradouro}, ${this.moradia.endereco.numero} - ${this.moradia.endereco.bairro}, ${this.moradia.endereco.cidade}`;
  }

  deletarCasa() {
    this.casaService.deletar(this.moradia.id)
      .subscribe(
        sucesso => this.processarSucesso(sucesso),
        falha => this.processarFalha(falha)
      );
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Moradia excluída com sucesso.', 'Sucesso!');
    toast.onHidden.subscribe(() => this.router.navigate(['/casa/lista']));
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível excluir esta moradia.', 'Ocorreu um problema!');
  }
}
