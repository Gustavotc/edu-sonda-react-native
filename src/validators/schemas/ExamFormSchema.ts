import { z } from 'zod';

const alternativeSchema = z.union([
  z.literal('Nenhuma', { message: 'Campo obrigatório' }),
  z.literal('Algumas', { message: 'Campo obrigatório' }),
  z.literal('Todas', { message: 'Campo obrigatório' }),
]);

const boolAlternativeSchema = z.boolean({ message: 'Campo obrigatório' });

export const examFormSchema = z
  .object({
    recognizesName: boolAlternativeSchema,
    recognizesAlphabet: alternativeSchema,
    recognizesNumbers: alternativeSchema,
    recognizesColors: alternativeSchema,
    recognizesForms: alternativeSchema,
    recognizesOwnBody: boolAlternativeSchema,
  })
  .required();

export type IExamFormSchema = z.infer<typeof examFormSchema>;
