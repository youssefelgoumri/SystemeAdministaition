import { Responsable } from "./responsable"
import { Semestre } from "./semestre"

export class Filiere {
  id!: number; // Utilisation du non-null assertion operator
  nom!: string;
  nombreAnnees!: number;
  nombreSemestresParAnnee!: number;
  semestres!: Semestre[];
  responsable!: Responsable;
}
