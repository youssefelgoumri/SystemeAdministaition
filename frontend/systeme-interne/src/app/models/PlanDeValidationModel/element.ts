import { Module } from "./module";

export class Element {
    id!:number;

    partieCours!: string;
    partieTPs!: string;

    coefficientCours!:number;
    coefficientTPs!:number;

    noteElement!:number;

    module!:Module;
}
