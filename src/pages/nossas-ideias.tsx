import { SectionWithImage } from "@/components/commons/section-with-image";
import { SectionFeaturesTwoColumns } from "@/components/workWithUs/section-features-two-columns";
import { SectionTechnologies } from "@/components/workWithUs/section-technologies";
import { SectionImageWithList } from "@/components/workWithUs/section-image-with-list";
import { SectionSingleNoPictures } from "@/components/workWithUs/section-single-no-pictures";
import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { Navbar } from "@/components/commons/navbar";
import { Footer } from "@/components/commons/footer";
import { workWithUsData } from "@/data/workWithUs.data";

const componentList = {
  Navbar,
  SectionWithImage,
  Footer,
  SectionFeaturesTwoColumns,
  SectionTechnologies,
  SectionSingleNoPictures,
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
