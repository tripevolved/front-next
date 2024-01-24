export type BaseEventData = {
  category: string;
  action: string;
  label?: string;
  [props: string]: any;
};

export type AddEvent = (dataEvent: BaseEventData | Record<string, any>) => void;

export type EventServiceConfig = {
  gtmId: string;
  gaId?: string;
  namespace: string;
  debugMode?: boolean;
  dataLayerName?: string;
};

export type EventServiceDataLayer = {
  event: string;
  dataLayerName: string;
  [k: string]: unknown;
};

export type DataLayer = EventServiceDataLayer[];

export type EventService = {
  send: (data: BaseEventData | string, action?: string, label?: string) => void;
  initialize: VoidFunction;
  destroy: VoidFunction;
  config: EventServiceConfig;
};
