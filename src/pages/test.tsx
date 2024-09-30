import { NextSeo } from "next-seo";
import { pageConfig } from "@/core/configs/page.config";
import { PageProps } from "@/core/types";
import type { GetStaticProps } from "next";
import { AppRibo } from "@/core/app-ribo";
import { CMSService } from "@/services/cms/cms-service";
import AppErrorRoute from "./app/_error";
import { useEffect, useState } from "react";
import { AutoScrollCards, Box, CardHighlight, Carousel, Picture, SectionBase, Slide, SquareSlider, SquareSliderCarousel, Text } from "@/ui";
import { Avatar } from "mars-ds";

export default function Page({ seo, ...children }: PageProps) {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(/^\/app/.test(location.pathname));
  }, []);

  if (isApp) return <AppErrorRoute />;

  return (
    <>
      <SectionBase>
        <SquareSlider title="O que dizem os nossos clientes" style={{backgroundColor: "var(--color-primary-500)", borderRadius: "12px", padding: "12px"}}>
          <CardHighlight style={{minWidth: "300px"}}>
            <Picture src="/assets/home/quote.png" />
            <Text size="md">
              A viagem para Paris foi cuidada nos mínimos detalhes, tudo perfeito!&quot
            </Text>
            <div>
              <Avatar size="xl" thumbnail={"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} />
              <Text as="strong" className="my-0 color-primary">
                João Silva - Viajou para Paris
              </Text>
            </div>
          </CardHighlight>
          <CardHighlight style={{minWidth: "300px"}}>
            <Picture src="/assets/home/quote.png" />
            <Text size="md">
              A viagem para Paris foi cuidada nos mínimos detalhes, tudo perfeito!&quot
            </Text>
            <div>
              <Avatar size="xl" thumbnail={"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} />
              <Text as="strong" className="my-0 color-primary">
                João Silva - Viajou para Paris
              </Text>
            </div>
          </CardHighlight>
          <CardHighlight style={{minWidth: "300px"}}>
            <Picture src="/assets/home/quote.png" />
            <Text size="md">
              A viagem para Paris foi cuidada nos mínimos detalhes, tudo perfeito!&quot
            </Text>
            <div>
              <Avatar size="xl" thumbnail={"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} />
              <Text as="strong" className="my-0 color-primary">
                João Silva - Viajou para Paris
              </Text>
            </div>
          </CardHighlight>
          <CardHighlight style={{minWidth: "300px"}}>
            <Picture src="/assets/home/quote.png" />
            <Text size="md">
              A viagem para Paris foi cuidada nos mínimos detalhes, tudo perfeito!&quot
            </Text>
            <div>
              <Avatar size="xl" thumbnail={"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} />
              <Text as="strong" className="my-0 color-primary">
                João Silva - Viajou para Paris
              </Text>
            </div>
          </CardHighlight>
          <CardHighlight style={{minWidth: "300px"}}>
            <Picture src="/assets/home/quote.png" />
            <Text size="md">
              A viagem para Paris foi cuidada nos mínimos detalhes, tudo perfeito!&quot
            </Text>
            <div>
              <Avatar size="xl" thumbnail={"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} />
              <Text as="strong" className="my-0 color-primary">
                João Silva - Viajou para Paris
              </Text>
            </div>
          </CardHighlight>
        </SquareSlider>
      </SectionBase>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const uid = "home";
    const props = await CMSService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    const props = await CMSService.getPageError();
    return { props, ...pageConfig.staticProps };
  }
};
