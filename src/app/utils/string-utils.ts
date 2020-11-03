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
}