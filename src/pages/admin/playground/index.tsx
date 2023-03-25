import { Playground } from "@/components";
import NoSSR from "react-no-ssr";

const PlaygroundPage = () => (
  <NoSSR>
    <Playground />
  </NoSSR>
);

export default PlaygroundPage;
