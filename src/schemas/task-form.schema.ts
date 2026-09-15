import { z } from 'zod';

export const MAX_FILE_SIZE_BYTES = 8 * 1024;
export const MAX_TOTAL_FILE_SIZE_BYTES = 12 * 1024;
export const MAX_SOURCE_LENGTH = 12_000;

export const taskFormSchema = z
  .object({
    taskDescription: z.string().trim().max(MAX_SOURCE_LENGTH, 'A descrição pode ter no máximo 12.000 caracteres.'),
    attachments: z.array(z.instanceof(File)).max(6, 'Envie no máximo 6 arquivos.'),
  })
  .superRefine((values, context) => {
    if (values.attachments.some((file) => file.size > MAX_FILE_SIZE_BYTES)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cada arquivo pode ter no máximo 8 KB.',
        path: ['attachments'],
      });
    }

    if (values.attachments.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_FILE_SIZE_BYTES) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Os arquivos somados podem ter no máximo 12 KB.',
        path: ['attachments'],
      });
    }

    if (!values.taskDescription && values.attachments.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Descreva a tarefa ou adicione pelo menos um arquivo de apoio.',
        path: ['taskDescription'],
      });
    }
  });

export type TaskFormValues = z.infer<typeof taskFormSchema>;
