import type { TaskFormValues } from '../../schemas/task-form.schema';
import { MAX_FILE_SIZE_BYTES, MAX_SOURCE_LENGTH, MAX_TOTAL_FILE_SIZE_BYTES } from '../../schemas/task-form.schema';

const ALLOWED_EXTENSIONS = ['txt', 'md', 'json', 'csv', 'yaml', 'yml'];

const getExtension = (fileName: string): string => fileName.split('.').pop()?.toLowerCase() ?? '';

export async function prepareTaskInput(values: TaskFormValues): Promise<string> {
  const sections = values.taskDescription ? [`TAREFA\n${values.taskDescription}`] : [];
  let sourceLength = values.taskDescription.length;
  let totalFileSize = 0;

  for (const file of values.attachments) {
    if (!ALLOWED_EXTENSIONS.includes(getExtension(file.name))) {
      throw new Error(`O arquivo "${file.name}" não é um formato de texto aceito.`);
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`O arquivo "${file.name}" ultrapassa o limite de 8 KB.`);
    }

    totalFileSize += file.size;
    if (totalFileSize > MAX_TOTAL_FILE_SIZE_BYTES) {
      throw new Error('Os arquivos somados ultrapassam o limite de 12 KB. Remova ou reduza um anexo.');
    }

    const content = (await file.text()).trim();
    if (!content) {
      continue;
    }
    if (sourceLength + content.length > MAX_SOURCE_LENGTH) {
      throw new Error('A descrição e os arquivos ultrapassam 12.000 caracteres. Reduza o conteúdo enviado.');
    }

    sections.push(`ARQUIVO: ${file.name}\n${content}`);
    sourceLength += content.length;
  }

  if (sections.length === 0) {
    throw new Error('Informe uma descrição ou um arquivo de apoio com conteúdo.');
  }

  return sections.join('\n\n---\n\n');
}
