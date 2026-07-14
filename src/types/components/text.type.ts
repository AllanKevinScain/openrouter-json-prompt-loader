import type { ComponentProps } from 'react';

type HMTLTextPickedProps = Pick<ComponentProps<'p'>, 'className' | 'children'>;

export interface TextProps extends HMTLTextPickedProps {
    variant?: 'default' | 'holded';
}
