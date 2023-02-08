import { RawScript } from "../RawScript";

const GTM_ID = process.env["NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID"];

const GoogleScripts = () => (
  <>
    <GtmScript id={GTM_ID} />

    <RawScript>{`
      (function(w,l){
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start':new Date().getTime(),
          event:'gtm.js',
        });
      })(window,'dataLayer');
    `}</RawScript>
  </>
);

interface ScriptID {
  url?: string;
  id?: string;
}

function GtmScript({ id = "GTM-KK9FMT3" }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googletagmanager.com/gtm.js?id=${id}`} />;
}

export default GoogleScripts;
