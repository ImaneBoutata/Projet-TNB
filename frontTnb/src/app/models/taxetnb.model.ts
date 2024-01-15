import {Terrain} from "./terrain.model";

export interface TaxeTNB {
  id?: number;
  tauxTerrain: number;
  surface: number;
  annee: number;
  montantPaye: number;
  terrain: Terrain;
}

