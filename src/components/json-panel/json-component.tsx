import { JsonView, collapseAllNested, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { JsonPanelComponentProps } from '../../types/components/json-panel.type';

export function JsonPanelComponent(props: JsonPanelComponentProps) {
  const { data, theme } = props;

  return (
    <JsonView
      clickToExpandNode
      data={data as object}
      shouldExpandNode={collapseAllNested}
      style={theme === 'light' ? defaultStyles : darkStyles}
    />
  );
}
