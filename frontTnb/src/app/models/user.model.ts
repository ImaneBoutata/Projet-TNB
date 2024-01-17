import { Terrain } from "./terrain.model";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;

  cin: string;
  nom: string;
  prenom: string;
  adresse: string;
  terrains?: Terrain[]; // Assuming you have a Terrain model
}


