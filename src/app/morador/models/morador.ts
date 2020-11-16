export interface Morador {
    id: string,
    casaId: string,
    nomeCompleto: string,
    receitaMensal: number,
    contribuicao: number,
    foto: string,
    fotoImagem: string,
    dataNascimento: Date,
    tipoMorador: number,
    documento: string,
    tipoDocumento: number
}

export interface Moradia {
    id: string,
    valorDespesas: number
}