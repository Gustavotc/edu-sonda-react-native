import { IStudent, IStudentJson } from './Student';

export type IStudentWithExamFlagJson = IStudentJson & {
  has_completed_exam: boolean;
};

export type IStudentWithExamFlag = IStudent & {
  hasCompletedExam: boolean;
};
