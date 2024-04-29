export class Absence {
  id!: number;
  etudiantId!: string;
  matiereId!: number;
  professeurId!: number;
  dateAbsence!: Date;
  creneauHoraire!: string;
  presenceProfesseur!: boolean;
  justification!: string;
}
