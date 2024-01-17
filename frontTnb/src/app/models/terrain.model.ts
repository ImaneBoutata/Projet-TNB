import { Categorie } from "./categorie.model";
import { TaxeTNB } from "./taxetnb.model";
import { User } from "./user.model";



export interface Terrain {
  terrainID?: number;
  surface: number;
  categorie: Categorie;
  proprietaire: User;
  taxesTNB: TaxeTNB[];
}
