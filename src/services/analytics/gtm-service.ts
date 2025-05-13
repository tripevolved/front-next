import { DATA_LAYER_NAME } from "./constants";
import type { DataLayer, EventServiceDataLayer } from "./types";

declare global {
  interface Window {
    [DATA_LAYER_NAME]: DataLayer;
  }
}

const createBodyScript = (gtmId: string) => {
  const noScript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = "0px";
  iframe.width = "0px";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noScript.append(iframe);
  return noScript;
};

const createHeadScript = (gtmId: string, dataLayerName = DATA_LAYER_NAME) => {
  const script = document.createElement("script");
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}', '${gtmId}');
  `;
  return script;
};

let destroy = () => {};

const initialize = (gtmId: string, dataLayerName?: string) => {
  const bodyScript = createBodyScript(gtmId);
  const headScript = createHeadScript(gtmId, dataLayerName);
  document.head.append(headScript);
  document.body.append(bodyScript);

  destroy = () => {
    bodyScript.remove();
    headScript.remove();
  };
};

const addEvent = (event: EventServiceDataLayer) => {
  const windowObject = window as any;
  const dataLayerName = event.dataLayerName;
  windowObject[dataLayerName] = windowObject[dataLayerName] || [];
  windowObject[dataLayerName].push(event);
};

export const GTMService = {
  initialize,
  addEvent,
  destroy,
};
