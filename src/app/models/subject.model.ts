import { User } from "./user.model";

export class Subject {
    _id!: string;
    name!: string;
    teacher?: User;
    preview?: string;
}
