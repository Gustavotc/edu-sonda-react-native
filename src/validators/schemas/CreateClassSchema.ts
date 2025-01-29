import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const createClassSchema = z.object({
  name: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
  year: z.coerce.number({ message: 'Informe  os 4 dígitos do ano' }).refine(
    (year) => {
      return Number.isInteger(year) && year >= 2000 && year <= currentYear;
    },
    {
      message: `O ano informado é inválido`,
    },
  ),
  step: z
    .string({ message: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
});

export type ICreateClassSchema = z.infer<typeof createClassSchema>;
