export class StringUtils {
    public static isNullOrEmpty(val: string): boolean {
        if (val === undefined || val.trim() === "" || val === null) {
            return true;
        }

        return false;
    }

    public static somenteNumeros(numero: string): string {
        return numero.replace(/[^0-9]/g, '');
    }

    public static currencyStringToNumber(currency: string): number {
        const formatedCurrency = currency.replace("R$", "").replace(".", "").replace(",", ".").trim();

        let currencyNumber: number = +formatedCurrency;
        return currencyNumber;
    }
}