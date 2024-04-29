import {Salle} from "../Sallesmodel/salle";

export class Reservation {
  id!: number;
  idProfesseur?: number;
  salle?: Salle;
  date_debut?: Date;
  date_fin?: Date;
}
