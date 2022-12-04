export type ComponentList = Record<string, Function>;

interface RenderComponentProps {
  component?: string;
  [props: string]: any;
}

export const newRenderComponentList = (componentList: ComponentList) => {
  return ({ component: componentName, ...props }: RenderComponentProps) => {
    if (!componentName) return null;
    const Component = componentList[componentName];
    if (!Component) return null;
    try {
      return <Component {...props} />;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
};
