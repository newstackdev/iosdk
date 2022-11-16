import { Route } from "react-router-dom";
import { useAppState } from "../overmind";

export const OverridableRoute: React.FunctionComponent<any> = (props: any) => {
  const state = useAppState();
  const component = state.config.routes.overrides[props.path];
  const _props = component ? { ...props, component } : props;
  return <Route {..._props} />;
};
