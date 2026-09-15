import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MAX_FILE_SIZE_BYTES, taskFormSchema } from '../schemas/task-form.schema';
import type { TaskFormValues } from '../schemas/task-form.schema';
import { Button, FileUpload } from 'safira-ui/react';
import type { TaskFormProps } from '../types/components/task-form.type';
import { taskFormDefaultValues } from '../constants/task-form';
import { WandSparkles } from 'lucide-react';

export function TaskForm(props: TaskFormProps) {
  const { isLoading, isReady, onSubmit } = props;

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskFormDefaultValues,
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-text" htmlFor="taskDescription">
          Descrição da tarefa
        </label>
        <textarea
          className="min-h-44 w-full resize-y rounded-lg border border-border bg-bg px-4 py-3 text-base leading-7 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          id="taskDescription"
          placeholder="Ex.: Criar uma API de autenticação com login, refresh token e validação..."
          {...register('taskDescription')}
        />
        {errors.taskDescription && (
          <p className="mt-2 text-sm font-medium text-red-400">{errors.taskDescription.message}</p>
        )}
      </div>

      <FileUpload
        acceptedFileTypes={['.txt', '.md', '.json', '.csv', '.yaml', '.yml', 'text/plain', 'text/markdown', 'application/json', 'text/csv']}
        description="Até 6 arquivos de texto, Markdown, JSON, CSV ou YAML: 8 KB por arquivo e 12 KB no total."
        error={errors.attachments?.message}
        inputProps={{ id: 'attachments' }}
        label="Arquivos de apoio"
        maxFiles={6}
        maxFileSize={MAX_FILE_SIZE_BYTES}
        multiple
        onFilesChange={(files) => setValue('attachments', [...files], { shouldValidate: true })}
      />

      <Button
        disabled={!isReady}
        loading={isLoading}
        loadingLabel="Gerando prompt"
        title={!isReady ? 'Informe a chave e escolha um modelo.' : undefined}
        type="submit"
      >
        <WandSparkles className="size-4" /> Gerar prompt
      </Button>
    </form>
  );
}
