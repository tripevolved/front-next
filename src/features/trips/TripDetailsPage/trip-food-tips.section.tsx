import { TripDetailInfo, type TripDetailInfoPros } from "./trip-detail-info.component";

export const TripFoodTipsSection = ({ text }: Pick<TripDetailInfoPros, "text">) => (
  <TripDetailInfo
    image="/assets/destino/dicas-gastronomicas.svg"
    title="Dicas gastronômicas"
    text={text}
  />
);
