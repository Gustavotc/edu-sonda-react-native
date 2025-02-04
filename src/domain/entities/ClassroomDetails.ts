import { IClass } from './Classes';
import { IStudent } from './Student';
import { ITeacher } from './Teacher';

export interface IClassroomDetails {
  classroom: IClass;
  teacher: ITeacher;
  students: IStudent[];
}

export interface IClassroomDetailsJson {
  id: number;
  name: string;
  year: number;
  step: string;
  teacher: {
    id: number;
    name: string;
    email: string;
  };
}
