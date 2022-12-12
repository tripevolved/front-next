import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { introData } from "@/data/wellcome.data";
import { SectionLogoWithImage } from "@/components/intro/section-logo-with-image";
import { SectionIntroDescription } from "@/components/intro/section-intro-description";

const componentList = {
  SectionLogoWithImage,
  SectionIntroDescription,
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
