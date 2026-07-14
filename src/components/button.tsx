import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '../types/components/button.type';
import { Loader2 } from 'lucide-react';

export function Button(props: ButtonProps) {
  const { isLoading = false, children, variant = 'solid', className, type = 'button', onClick, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={twMerge(
        'min-h-11 w-full rounded-lg px-5 py-3',
        'text-sm font-semibold',
        'disabled:cursor-not-allowed',
        'inline-flex items-center justify-center gap-2',
        'transition',
        'cursor-pointer',
        variant === 'solid' &&
          'from-primary to-secondary bg-linear-to-r text-white hover:opacity-90 disabled:opacity-60',
        variant === 'outline' && 'border-border bg-bg text-text hover:border-primary hover:text-primary border',
        className,
      )}
      disabled={isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}
