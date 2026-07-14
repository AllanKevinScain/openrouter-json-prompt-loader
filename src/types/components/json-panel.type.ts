import { ThemeType } from '../hooks/use-theme.type';

export interface JsonPanelProps {
  data: unknown;
}

export interface JsonPanelComponentProps extends JsonPanelProps {
  theme: ThemeType;
}
