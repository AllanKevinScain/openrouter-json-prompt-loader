import { twMerge } from 'tailwind-merge';
import type { TextProps } from '../types/components/text.type';

export function Text(props: TextProps) {
  const { children, className, variant = 'default' } = props;

  return (
    <p className={twMerge('text-text text-sm leading-6', variant === 'default' && 'text-text/65', className)}>
      {children}
    </p>
  );
}
