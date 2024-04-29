import { Statut } from "./statut";

export class ResultatSemestre {
    cne!:string;
    semestreID!:string;
    filiereID!:number;
    note_finale!:number
    statut!:Statut;
    filiere?:string;
}
