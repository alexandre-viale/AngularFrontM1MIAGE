import { Subject } from "./subject.model";

export class Assignment {
  _id!: string;
  nom!: string;
  dateRendu!: string;
  rendu!: boolean;
  grade?: number;
  subject!: Subject;
  comment?: string;
}