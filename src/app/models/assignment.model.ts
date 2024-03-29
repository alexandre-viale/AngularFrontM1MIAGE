import { Subject } from "./subject.model";
import { User } from "./user.model";

export class Assignment {
  _id!: string;
  nom!: string;
  dateRendu!: string;
  rendu!: boolean;
  grade?: number;
  subject!: Subject;
  comment?: string;
  owner!: User;
}