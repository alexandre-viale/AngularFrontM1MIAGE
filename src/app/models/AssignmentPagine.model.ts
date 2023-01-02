import { Assignment } from "./assignment.model";
export class AssignmentPagine {
  assignments: Assignment[] = [];
  page!: number;
  limit!: number;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPages!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
}