import { User } from "./user.model";

export class Subject {
    nom!: string;
    teacher?: User;
    _id!: string;
}
