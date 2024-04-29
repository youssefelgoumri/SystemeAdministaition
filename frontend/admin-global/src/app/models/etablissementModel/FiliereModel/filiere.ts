import { Responsable } from "./responsable"
import { Semestre } from "./semestre"

export class Filiere {
    id!: number
    nom!: string
    nombreAnnees!: number
    nombreSemestresParAnnee!: number
    responsable!: Responsable
    modulesId!: number[]
    semestres!: Semestre[]
}