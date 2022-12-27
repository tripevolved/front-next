import { useState } from "react";

import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionImage } from "@/components/commons/section-image";
import { SectionWithImage } from "@/components/commons/section-with-image";

import { RadioInputQuestion } from "@/components/onbording/radio-input-question";

const componentList = {
  SectionImage,
  SectionWithImage,
};

const RenderComponent = newRenderComponentList(componentList);

const Wellcome = () => {
  const [value, setValue] = useState<number| string>(1);

  const radioData = {
    row: true,
    value,
    options: [
      {
        value: 1,
        children: "Primeiro"
      },
      {
        value: 2,
        children: "Segundo"
      },
      {
        value: 3,
        children: "Terceiro"
      }
    ]
  }

  return (
    <main>
      {introData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
      <RadioInputQuestion {...radioData} onChange={setValue} />
    </main>
  );
};

export default Wellcome;
