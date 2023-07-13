import type { CustomProfileDestinationsProps } from "./custom-profile-destinations.types";

import { useMemo } from "react";
import { useRouter } from "next/router";

import { makeCn } from "@/utils/helpers/css.helpers";

import { MediaObject, Text, WhatsappButton } from "@/ui";
import { Grid } from "mars-ds";

import { DestinationsByProfileName } from "../DestinationsByProfileName";

export function CustomProfileDestinations({
  className,
  children,
  profileName: name,
  sx,
  ...props
}: CustomProfileDestinationsProps) {
  const cn = makeCn("custom-profile-destinations", className)(sx);

  const { asPath } = useRouter();
  const profileName = useMemo(() => name || asPath.replace(/.*\/(.*)\/$/, "$1"), [asPath, name]);

  const message = useMemo(() => {
    return `Olá, eu já sei para onde quero ir! O meu perfil viajante é: ${profileName}`;
  }, [profileName]);

  return (
    <MediaObject className={cn} {...props}>
      <Grid className="mt-lg">
        <Text heading size="xs">
          Alguns destinos que você pode gostar:
        </Text>
        <DestinationsByProfileName profileName={profileName} />
        <div>
          <WhatsappButton message={message} variant="secondary">
            Já sei para onde ir
          </WhatsappButton>
        </div>
      </Grid>
      {children}
    </MediaObject>
  );
}
