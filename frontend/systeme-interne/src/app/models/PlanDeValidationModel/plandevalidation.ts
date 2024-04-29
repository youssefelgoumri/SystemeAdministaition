import { Plandevalidationid } from "./plandevalidationid";

export class Plandevalidation {
  id!: Plandevalidationid;
  cne!: string;
  moduleID!: number;
  moduleIntitule?:string;
  semestreID!: string;
  filiereID!: number;
  filiereNom?:string
  elementID!: number;
  partieCours?:string;
  noteTP!: number;
  noteExam!: number;
  noteFinale?: number;
  resultat?: string; // Assuming Resultat is a string enum in your Spring Boot project
}
