import { User } from "./user.model";

export class Subject {
    name!: string;
    teacher?: User;
    _id!: string;
}
