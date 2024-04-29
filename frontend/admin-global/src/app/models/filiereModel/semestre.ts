import { Module } from "./ModuleModel/module";

export class Semestre {
  id!: number;
  nomSemestre!: string;
  modulesIds!: number[];
}
