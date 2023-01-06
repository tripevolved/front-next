import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionImage } from "@/components/commons/section-image";
import { SectionWithImage } from "@/components/commons/section-with-image";

import { DatePickerQuestion } from "@/components/onbording/date-picker-question";

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
      <DatePickerQuestion />
    </main>
  );
};

export default Wellcome;
