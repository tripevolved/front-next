import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionImage } from "@/components/commons/section-image";
import { SectionWithImage } from "@/components/commons/section-with-image";

import { Stepper } from "@/components/commons/stepper";

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
      <Stepper max={5} step={4} defaultValue={4} />
    </main>
  );
};

export default Wellcome;
