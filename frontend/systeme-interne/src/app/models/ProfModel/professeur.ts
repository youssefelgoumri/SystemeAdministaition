import { Reservation } from "../reservationModel/reservation";
import {Departement} from "./departement";

export class Professeur {
   id!: number;
   nom!: string;
   prenom!: string;
   email!: string;
   password!: string;
   etablissement!: string;
   departement!: Departement;
   discipline!: Departement[];
   reservations!:Reservation[]
}
