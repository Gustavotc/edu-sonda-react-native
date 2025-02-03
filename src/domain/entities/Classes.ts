import { IStudent } from './Student';

export type IClassJson = {
  id: number;
  name: string;
  year: number;
  step: string;
  teacher: {
    id: number;
    email: string;
    name: string;
  };
};

export type IClass = {
  id: number;
  name: string;
  year: number;
  step: string;
  teacherId: number;
  students: IStudent[];
};
