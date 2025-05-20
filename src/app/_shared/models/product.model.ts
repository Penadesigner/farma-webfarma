import { MedDetails } from './med-details.model';

export class Product {
    ean: string = 'EAN';
    nomeCurto: string = "Produto";
    nomeCompleto: string = "Nome do Produto";
    marca: string = "Marca";
    minPrice: number = 0;
    minDistance: number = 0;
    maxPrice: number = 0;
    maxDistance: number = 0;
    avgPrice:number = 0;
    numAdv: number = 0;
    rk: number = 0;
    descricao: string;

    detalhes: MedDetails = new MedDetails();
}