import { browser, ExpectedConditions, element, by } from 'protractor';


export abstract class AppBasePage {
    
    constructor() {
        browser.driver.manage().window().maximize();
    }

    navegarParaHome() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    navegarViaUrl(url: string) {
        return browser.get(url) as Promise<any>;
    }

    navegarPorLink(link: string) {
        const elementLink = element(by.linkText(link));

        browser.wait(ExpectedConditions.elementToBeClickable(elementLink)).then(() => {
            return elementLink.click();
        });
    }

    obterElementoXPath(xPath: string) {
        return element(by.xpath(xPath));
    }

    esperar = (milisegundos: number) => {
        browser.sleep(milisegundos);
    }

    // LOGIN
    email = element(by.id('email'));
    senha = element(by.id('password'));

    login() {
        this.navegarPorLink("Entrar");
        this.email.sendKeys('ultimo@teste.com');
        this.senha.sendKeys('Teste_123');

        element(by.id('login')).click();
        this.esperar(6000);
    }
}