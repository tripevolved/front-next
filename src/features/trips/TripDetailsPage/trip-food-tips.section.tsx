import { TripDetailInfo, type TripDetailInfoPros } from "./trip-detail-info.component";

export const TripFoodTipsSection = ({ text }: Pick<TripDetailInfoPros, "text">) => (
  <TripDetailInfo title="Dicas gastronômicas" text={text} />
);
