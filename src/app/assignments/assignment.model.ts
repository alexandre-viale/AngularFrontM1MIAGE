import { Subject } from "../subject.model";

export class Assignment {
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  grade?: number;
  subject!: Subject;
  _id!: string;
}