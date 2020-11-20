import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoradorService } from './../services/morador.service';
import { environment } from './../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Morador } from './../models/morador';

@Component({
  selector: 'app-exclusao',
  templateUrl: './exclusao.component.html'
})
export class ExclusaoComponent implements OnInit {

  urlImages: string = environment.urlImages;
  errors: string[] = [];

  morador: Morador;

  constructor(private activatedRoute: ActivatedRoute,
    private moradorService: MoradorService,
    private toastr: ToastrService,
    private router: Router) {
    this.morador = this.activatedRoute.snapshot.data['morador'];
  }

  ngOnInit(): void {
  }

  excluir() {
    if (confirm('Deseja realmente excluir este morador?') == false) return;

    this.moradorService.excluir(this.morador.id)
      .subscribe(
        sucesso => this.processarSucesso(sucesso),
        falha => this.processarFalha(falha)
      );
  }

  processarSucesso(response: any) {
    const successToastr = this.toastr.success('Morador excluído com sucesso.', 'Sucesso!');
    successToastr.onHidden.subscribe(() => this.router.navigate(['/morador/lista']));
  }

  processarFalha(fail: any) {
    if (fail.error.errors) {
      this.errors = fail.error.errors;
    }

    this.toastr.error('Não foi possível excluir o morador.', 'Ocorreu um problema!');
  }
}
