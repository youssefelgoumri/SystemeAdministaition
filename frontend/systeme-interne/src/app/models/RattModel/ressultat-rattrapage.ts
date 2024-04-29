import { Statut } from "./statut";

export class RessultatRattrapage {
    cne!: string;
    moduleID!: number;
    semestreID!: string;
    filiereID!: number;
    note_ordinaire?: number;
    note_rattrapage?: number;
    note_final?: number;
    statut?: Statut;
    filiere?:string;
    module?:string;
}
