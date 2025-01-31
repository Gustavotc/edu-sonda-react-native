import { IClass } from './Classes';
import { ITeacher } from './Teacher';

export interface IClassroomDetails {
  classroom: IClass;
  teacher: ITeacher;
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
