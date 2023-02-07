import { RawScript } from "../RawScript";

const GA_ID = process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"];
const GTM_ID = process.env["NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID"];
const OPTIMIZE_ID = process.env["NEXT_PUBLIC_GOOGLE_OPTIMIZE_ID"];

const GoogleScripts = () => (
  <>
    {/* <meta
      property="google-site-verification"
      content="7xa_GKTHjFJ2Uk286oo7ggGv3myPaovi_h7doBgJ-0A"
    /> */}

    <GAScript id={GA_ID} />
    <OptimizeScript id={OPTIMIZE_ID} />
    <GtmScript id={GTM_ID} />

    <RawScript>{`
      (function(w,l){
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start':new Date().getTime(),
          event:'gtm.js',
          config:'${GA_ID}',
          event:'optimize.activate'
        });
      })(window,'dataLayer');
    `}</RawScript>
  </>
);

interface ScriptID {
  url?: string;
  id?: string;
}

function OptimizeScript({ id }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googleoptimize.com/optimize.js?id=${id}`} />;
}

function GtmScript({ id = "GTM-KK9FMT3" }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googletagmanager.com/gtm.js?id=${id}`} />;
}

function GAScript({ id = "G-4W2CG7W3GC" }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />;
}

export default GoogleScripts;
