import { SectionWithImage } from "@/components/commons/section-with-image";
import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { Navbar } from "@/components/commons/navbar";
import { Footer } from "@/components/commons/footer";
import { workWithUsData } from "@/data/workWithUs.data";

const componentList = {
  Navbar,
  SectionWithImage,
  Footer,
};

const RenderComponent = newRenderComponentList(componentList);

const HowWeWorks = () => {
  return (
    <main>
      {workWithUsData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
    </main>
  )
};

export default HowWeWorks;
