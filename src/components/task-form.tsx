import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, WandSparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { taskFormSchema } from '../schemas/task-form.schema';
import type { TaskFormValues } from '../types/prompt';

type TaskFormProps = {
  isLoading: boolean;
  onSubmit: (values: TaskFormValues) => void;
};

export function TaskForm({ isLoading, onSubmit }: TaskFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskDescription:
        'Preciso de um endpoint REST para cadastrar usuários com nome, email e senha, com validação e hash de senha.',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="taskDescription">
          Descrição da tarefa
        </label>
        <textarea
          className="min-h-44 w-full resize-y rounded-lg border border-line bg-white px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/15"
          id="taskDescription"
          placeholder="Ex: Criar uma API de autenticação com login, refresh token e validação..."
          {...register('taskDescription')}
        />
        {errors.taskDescription ? (
          <p className="mt-2 text-sm font-medium text-coral">{errors.taskDescription.message}</p>
        ) : null}
      </div>

      <button
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-moss/60 sm:w-auto"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <WandSparkles className="size-4" />}
        {isLoading ? 'Gerando prompt...' : 'Gerar prompt para Codex'}
      </button>
    </form>
  );
}
