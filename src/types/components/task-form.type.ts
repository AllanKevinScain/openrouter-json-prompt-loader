import type { TaskFormValues } from '../../schemas/task-form.schema';

export interface TaskFormProps {
  isLoading: boolean;
  isReady: boolean;
  onSubmit: (values: TaskFormValues) => void;
}
