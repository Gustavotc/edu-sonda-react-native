import { z } from 'zod';

export const createStudentSchema = z
  .object({
    name: z
      .string({ message: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' }),
    dateOfBirth: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento inválida'),
  })
  .required();

export type ICreateStudentSchema = z.infer<typeof createStudentSchema>;
