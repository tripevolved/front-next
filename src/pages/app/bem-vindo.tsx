import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionImage } from "@/components/commons/section-image";
import { SectionWithImage } from "@/components/commons/section-with-image";

import { RadioInputQuestion, RadioInputQuestionProps } from "@/components/onbording/radio-input-question";

const componentList = {
  SectionImage,
  SectionWithImage,
};

const RenderComponent = newRenderComponentList(componentList);

const Wellcome = () => {
  const myProps: RadioInputQuestionProps = {
    value: '1',
    row: true,
    options: [
      { value: '1', children: "Primeiro valor" },
      { value: '2', children: "Segundo valor" },
    ],
  };

  return (
    <main>
      {introData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
      <RadioInputQuestion {...myProps} />
    </main>
  );
};

export default Wellcome;
