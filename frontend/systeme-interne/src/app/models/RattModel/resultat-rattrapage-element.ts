import { Statut } from "./statut";

export class ResultatRattrapageElement {
    cne!: string;
    moduleID!: number;
    semestreID!: string;
    filiereID!: number;
    elementID!: number;
    note_ordinaire?: number;
    note_rattrapage?: number;
    noteTPratt!: number;
    noteExamratt!: number;
    note_final?: number;
    statut?: Statut;
    module?:string;
    elementintitule?:string;
}
