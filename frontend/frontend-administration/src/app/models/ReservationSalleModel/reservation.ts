import { Salle } from "./salle";

export class Reservation {
    private id!:number;
    private IdProfesseur!:number;
    private salle!:Salle;
    private date_debut!:Date;
    private date_fin!:Date;
}
