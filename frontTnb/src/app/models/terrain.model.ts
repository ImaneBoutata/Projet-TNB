import { Categorie } from "./categorie.model";



export interface Terrain {
  terrainID?: number;
  surface: number;
  categorie: Categorie;
  proprietaire: User;
  //taxesTNB: TaxeTNB[];
}
