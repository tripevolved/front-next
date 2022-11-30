import { SectionHero } from "@/components/home/section-hero";
import { home } from "@/data/home";

const Home = () => {
  return (
    <main>
      <SectionHero {...home.sections[0]} />
    </main>
  );
};

export default Home;
