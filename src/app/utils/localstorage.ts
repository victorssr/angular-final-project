
export class LocalStorageUtils {

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.user);
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('vsdev.token', token);
    }

    public salvarUsuario(userJson: string) {
        localStorage.setItem('vsdev.user', JSON.stringify(userJson));
    }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem("vsdev.user"));
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('vsdev.token');
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('vsdev.user');
        localStorage.removeItem('vsdev.token');
    }
}