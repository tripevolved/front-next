import { SectionFeaturesAbout } from "@/components/about/section-features";
import { Footer } from "@/components/commons/footer";
import { Navbar } from "@/components/commons/navbar";
import { SectionWithImage } from "@/components/commons/section-with-image";
import { newRenderComponentList } from "@/components/hoc/render-component-list";
import { aboutData } from "@/data/about.data";
const componentList = {
  Footer,
  Navbar,
  SectionFeaturesAbout,
  SectionWithImage,
};

const RenderComponent = newRenderComponentList(componentList);

const AboutUs = () => {
  return (
    <main>
      {aboutData.sections.map((props, key) => (
        <RenderComponent key={props.id || key} {...props} />
      ))}
    </main>
  );
};

export default AboutUs;
