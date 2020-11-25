import { element, by } from 'protractor';
import { AppBasePage } from '../app.base.po';
import * as path from 'path';

export class AppMoradorPage extends AppBasePage {

    constructor() {
        super();
    }

    iniciarNavegacao() {
        super.navegarParaHome();
        super.login();
        this.navegarParaMoradores();
    }

    navegarParaMoradores() {
        super.navegarPorLink('Moradores');
    }

    navegarParaCadastro() {
        super.navegarPorLink('Cadastrar morador');
    }

    obterTituloMoradores() {
        return super.obterElementoXPath('/html/body/app-root/morador-app-root/app-lista/div/h1').getText();
    }

    obterToastrResponse() {
        return element(by.css('.toast-message')).getText();
    }

    listaFornecedores = element.all(by.tagName('option'));

    selecionarMoradia() {
        this.listaFornecedores.get(1).click();
    }

    nomeCompleto = element(by.id('nomeCompleto'));
    receitaMensal = element(by.id('receitaMensal'));
    contribuicao = element(by.id('contribuicao'));
    foto = element(by.id('foto'));
    dataNascimento = element(by.id('dataNascimento'));
    tipoMorador1 = element(by.id('tipoMorador-1'));
    tipoDocumentoCnpj = element(by.id('cnpj'));
    documento = element(by.id('documento'));
    
    botaoSubmit = element(by.id('cadastrarMorador'));

    selecionarImagem() {
        const caminho = path.resolve(__dirname, 'imagem_teste.jpg');
        element(by.id('foto')).sendKeys(caminho);
    }

}