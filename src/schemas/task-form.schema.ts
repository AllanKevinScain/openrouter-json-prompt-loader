import { z } from 'zod';

export const taskFormSchema = z.object({
  taskDescription: z.string().min(12, 'Descreva a tarefa com um pouco mais de contexto.'),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
