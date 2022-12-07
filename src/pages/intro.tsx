import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/intro.data";

const componentList = {};

const RenderComponent = newRenderComponentList(componentList);

const AboutUs = () => {
  return (
    <main>
      {introData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
    </main>
  );
};

export default AboutUs;
