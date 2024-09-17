import React from "react";
import { useRouter } from "next/router";
import { ListTravelProps } from "../section-filter-travel.types";
import { DEFAULT_CARD_IMAGE_URL } from "@/core/constants";

enum Size {
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
}

export function ListTravel({ mainChoice, otherChoices }: ListTravelProps) {
  const router = useRouter();

  const getImageUrl = (images: any[]) => {
    if (images && images.length > 0) {
      const xxlImage = images[0].sources.find((item: any) => item.type === Size.XXL);
      if (xxlImage && xxlImage.url) {
        return xxlImage.url;
      }
    }
    return DEFAULT_CARD_IMAGE_URL;
  };

  const handleDestinationClick = (uniqueName: string) => {
    router.push(`/destinos/${uniqueName}`);
  };

  return (
    <div className="box-list-travel">
      <div className="box-list-travel-title">
        <p>Destinos recomendados para sua viagem</p>
      </div>
      <div className="container-list-travel">
        <div
          className="list-travel-image-1 row-list-travel"
          style={{
            background: `linear-gradient(180deg, rgba(58, 56, 56, 0.7) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
            url('${getImageUrl(mainChoice.images)}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => handleDestinationClick(mainChoice.uniqueName)}
        >
          <span>
            <span className="icon-target"></span>Match: {mainChoice.percentualMatchScore}
          </span>
          <div className="footer-item-travel primary">
            <span className="item-travel-list-title">{mainChoice.name}</span>
            <span className="item-travel-list-subtitle"></span>
            <span className="item-travel-list-price">{mainChoice?.price}</span>
          </div>
        </div>

        <div className="row-list-travel">
          {otherChoices.slice(0, 2).map((choice, index) => (
            <div
              key={choice.destinationId}
              className={`list-travel-image-${index + 2} row-list-travel`}
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
                url('${getImageUrl(choice.images)}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleDestinationClick(choice.uniqueName)}
            >
              <span>
                <span className="icon-target"></span>Match: {choice.percentualMatchScore}
              </span>
              <div className="footer-item-travel second">
                <span className="item-travel-list-title">{choice.name}</span>
                <span className="item-travel-list-price">{choice?.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
