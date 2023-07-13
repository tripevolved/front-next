import { Environment } from "@/utils/helpers/environment.helpers";
import { RawScript } from "../RawScript";

const GTM = process.env["NEXT_PUBLIC_GTM"] || "GTM-KK9FMT3";
const GA = process.env["NEXT_PUBLIC_GA"] || "G-4W2CG7W3GC";

const GoogleScripts = () => {
  if (!Environment.isProduction()) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM}`} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} />

      <RawScript>{`
        (function(w,l){
          w[l] = w[l] || [];
          w[l].push({
            'gtm.start':new Date().getTime(),
            event:'gtm.js',
          });
          w[l].push('js', new Date())
          w[l].push('config', '${GA}')
        })(window,'dataLayer');
      `}</RawScript>
    </>
  );
}

export default GoogleScripts;
