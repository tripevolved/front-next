import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionImage } from "@/components/commons/section-image";
import { SectionWithImage } from "@/components/commons/section-with-image";

const componentList = {
  SectionImage,
  SectionWithImage,
};

const RenderComponent = newRenderComponentList(componentList);

const Wellcome = () => {
  return (
    <main>
      {introData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
    </main>
  );
};

export default Wellcome;
