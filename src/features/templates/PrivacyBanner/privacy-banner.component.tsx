import { CookieService } from "@/services/cookie";
import { Text } from "@/ui";
import { makeCn } from "@/utils/helpers/css.helpers";
import { Card, CardElevations, Link, ToggleButton } from "mars-ds";
import { useEffect, useState } from "react";

const PRIVACY_BANNER_KEY = "PRIVACY_BANNER_KEY";
const TIMEOUT = 1000;

export function PrivacyBanner() {
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState(false);

  const onConfirm = () => {
    setShow(false);
    setTimeout(() => setHide(true), TIMEOUT);
    CookieService.set(PRIVACY_BANNER_KEY, "true");
  };

  useEffect(() => {
    const shouldShow = !CookieService.get(PRIVACY_BANNER_KEY);
    setHide(!shouldShow);
    setTimeout(() => setShow(shouldShow), TIMEOUT);
  }, []);

  if (hide) return null;

  const cn = makeCn("privacy-banner", { "privacy-banner--show": show })();

  return (
    <Card className={cn} elevation={CardElevations.Medium}>
      <Text>
        Utilizamos cookies de terceiros para melhorar a sua experiência de uso na nossa plataforma.
        Consulte a nossa <Link href="/politica-de-cookies">Política de Cookies</Link> para saber
        mais.
      </Text>
      <ToggleButton iconName="x" onClick={onConfirm} />
    </Card>
  );
}
