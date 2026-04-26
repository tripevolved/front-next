import { getCollectionByUniqueName, getCollections } from "./collections";

export const CollectionsApiService = {
  getCollections,
  getCollectionByUniqueName,
};

export type {
  Collection,
  CollectionImage,
  CollectionsResponse,
  GetCollectionsParams,
  TravelerType,
} from "./collections";

