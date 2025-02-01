import { IStudent, IStudentJson } from './Student';

export type IEnrollmentJson = {
  id: number;
  startDate: string;
  endDate: string;
  student: IStudentJson;
};

export type IEnrollment = {
  id: number;
  startDate: string;
  endDate: string;
  student: IStudent;
};
