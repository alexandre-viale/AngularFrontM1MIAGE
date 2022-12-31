import { Subject } from "./subject.model";


export class Assignment {
  nom!: string;
  dateRendu!: string;
  rendu!: boolean;
  grade?: number;
  subject!: Subject;
  _id!: string;
}