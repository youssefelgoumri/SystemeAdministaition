import { Filiere } from "./FiliereModel/filiere";

export class Etablissement {
  codeName!: string;
  nom!: string;
  ville!: string;
  discipline!: string;
  filieres!: Filiere[]
}
