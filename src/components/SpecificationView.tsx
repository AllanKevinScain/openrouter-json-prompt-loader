import type { PromptSpecification } from '../types/prompt';

type SpecificationViewProps = {
  specification: PromptSpecification;
};

const sections: Array<{
  key: keyof PromptSpecification;
  title: string;
}> = [
  { key: 'contexto', title: 'Contexto' },
  { key: 'requisitos', title: 'Requisitos' },
  { key: 'nao_requisitos', title: 'Não-requisitos' },
  { key: 'criterios_aceite', title: 'Critérios de aceite' },
  { key: 'contrato', title: 'Contrato' },
  { key: 'plano_teste', title: 'Plano de teste' },
];

export function SpecificationView({ specification }: SpecificationViewProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {sections.map((section) => {
        const value = specification[section.key];

        return (
          <section className="rounded-lg border border-line bg-white p-4" key={section.key}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-moss">{section.title}</h2>
            {Array.isArray(value) ? (
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
                {value.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-6 text-ink">{value}</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
