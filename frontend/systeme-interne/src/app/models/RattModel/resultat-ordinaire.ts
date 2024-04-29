import { Resultat } from "./resultat";

export class ResultatOrdinaire {
     CNE!:string;
     moduleID!:number;
     semestreID!:string;
     filiereID!:number;
     elementID!:number;
     noteTP?:number;
     noteExam?:number;
     noteFinale?:number;
     resultat?:Resultat;
}
