import { Plandevalidationmoduleid } from './plandevalidationmoduleid';
import { Plandevalidation } from './plandevalidation'; // Assuming you have already defined PlanDeValidation
import { Element } from './element';

export class Plandevalidationmodule {
  id!: Plandevalidationmoduleid;
  cne!: string;
  moduleID!: number;
  moduleIntitule?:string;
  semestreID!: string;
  filiereID!: number;
  filiereNom?:string
  planDeValidationsElements?: Plandevalidation[];
  noteFinale?: number;
  resultat?: string; // Assuming Resultat is a string enum in your Spring Boot project
  elements?:Element[]
}
