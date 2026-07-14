import { ComponentProps } from 'react';

type HMTLButtonPickedProps = Pick<ComponentProps<'button'>, 'className' | 'type' | 'title' | 'onClick' | 'children'>;

export interface ButtonProps extends HMTLButtonPickedProps {
  isLoading?: boolean;
  variant?: 'solid' | 'outline';
}
