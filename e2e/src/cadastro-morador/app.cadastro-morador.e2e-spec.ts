import { browser, logging } from 'protractor';
import { AppMoradorPage } from './app.cadastro-morador.po';

describe('Teste de formulário de cadastro', () => {
    let page: AppMoradorPage;

    beforeEach(() => {
        page = new AppMoradorPage();
    });

    it('deve navegar até moradores', () => {
        page.iniciarNavegacao();
        expect(page.obterTituloMoradores()).toEqual('Moradores');
    });

    it('deve preencher formulário de produtos com sucesso', () => {
        page.navegarParaCadastro();

        page.selecionarMoradia();
        page.nomeCompleto.sendKeys('Teste');
        page.receitaMensal.sendKeys('5.000,25');
        page.contribuicao.sendKeys('2.000,55');
        page.selecionarImagem();
        page.dataNascimento.sendKeys('09/11/1997');
        page.tipoMorador1.click();
        page.tipoDocumentoCnpj.click();
        page.documento.sendKeys('42396353000100');

        page.botaoSubmit.click();
        page.esperar(1000);

        expect(page.obterToastrResponse()).toEqual('Morador cadastrado com sucesso.');
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);

        expect(logs).not.toContain(jasmine.objectContaining(
            { level: logging.Level.SEVERE } as logging.Entry
        ));
    });
});