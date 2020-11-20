import { Morador } from './../../morador/models/morador';
import { Endereco } from "./endereco";

export interface Moradia {
    id: string,
    valorDespesas: number,
    endereco: Endereco
    moradores: Morador[]
}