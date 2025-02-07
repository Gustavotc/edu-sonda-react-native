import { z } from 'zod';

const alternativeSchema = z.union([
  z.literal('Nenhuma', { message: 'Campo obrigatório' }),
  z.literal('Algumas', { message: 'Campo obrigatório' }),
  z.literal('Todas', { message: 'Campo obrigatório' }),
]);

const classificationSchema = z.union([
  z.literal('pré silábico', { message: 'Campo obrigatório' }),
  z.literal('silábico sem valor', { message: 'Campo obrigatório' }),
  z.literal('silábico com valor', { message: 'Campo obrigatório' }),
  z.literal('silábico alfabético', { message: 'Campo obrigatório' }),
  z.literal('alfabético', { message: 'Campo obrigatório' }),
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
    classification: classificationSchema,
  })
  .required();

export type IExamFormSchema = z.infer<typeof examFormSchema>;
