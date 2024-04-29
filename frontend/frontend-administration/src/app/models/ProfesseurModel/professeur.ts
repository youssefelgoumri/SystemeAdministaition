import {Departement} from "../enums/departement";


export class Professeur {
  private id!: number;
  private nom!: string;
  private prenom!: string;
  private email!: string;
  private password!: string;
  private etablissement!: string;
  private departement!: Departement;
  private discipline!: Departement[];
}
