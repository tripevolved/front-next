import { Button, ButtonProps, Modal, Skeleton, TextField } from "mars-ds";
import type { ShareButtonProps, SocialSharingModalProps } from "./share-button.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Box, MediaObject, ModalContent } from "@/ui";
import copy from "copy-to-clipboard";
import { getSocialSharingList } from "./share-button.helpers";
import { pageConfig } from "@/core/configs/page.config";
import { useEffect, useState } from "react";
import { useAppStore } from "@/core/store";

const DEFAULT_HEADING = "Compartilhar";
const DEFAULT_MESSAGE =
  "Já conhece a Trip Evolved? Você pode ganhar uma viagem gratuita com eles, só precisa entrar para a lista de espera, como eu fiz. Confira aqui no link: {{LINK}}";

export function ShareButton({
  className,
  sx,
  image,
  text,
  href,
  link,
  message = DEFAULT_MESSAGE,
  label = DEFAULT_HEADING,
  heading = DEFAULT_HEADING,
  ...props
}: ShareButtonProps) {
  const [loading, setLoading] = useState(true);
  const [sharingLink, setSharingLink] = useState(pageConfig.url);
  const { ref, inviter, email, fetching } = useAppStore(({ lead }) => ({
    ref: lead.launchList?.id || "",
    inviter: lead?.name?.split(" ")[0] || "",
    email: encodeURIComponent(lead?.email || ""),
    fetching: lead.fetching,
  }));

  const cn = makeCn("share-button", className)(sx);

  useEffect(() => {
    setLoading(true);
    const url = href || link || pageConfig.url;
    const fullURL = `${url}?ref=${ref}&inviter=${inviter}&email=${email}`;
    setSharingLink(fullURL);
    setLoading(false);
  }, [email, href, inviter, link, ref]);

  const handleClick = () => {
    Modal.open(
      () => (
        <SocialSharingModal
          link={sharingLink}
          message={message}
          heading={heading}
          text={text}
          image={image}
        />
      ),
      { size: "sm" }
    );
    copy(sharingLink);
  };

  return (
    <Box className={cn}>
      <Skeleton active={loading || fetching}>
        <Button variant="secondary" iconName="share" onClick={handleClick} {...props}>
          {label}
        </Button>
      </Skeleton>
    </Box>
  );
}

const SocialSharingModal = ({ link, message, ...props }: SocialSharingModalProps) => {
  return (
    <ModalContent className="text-center">
      <MediaObject {...props} />
      <div className="my-xl text-left">
        <TextField label="Clique para copiar" value={link} readOnly onClick={() => copy(link)} />
      </div>
      <div className="my-xl flex flex-wrap gap-sm justify-content-center">
        {getSocialSharingList(message, link).map(({ name, ...props }) => (
          <SocialShare key={name} {...props} target="_blank">
            {name}
          </SocialShare>
        ))}
      </div>
    </ModalContent>
  );
};

const SocialShare = (props: ButtonProps) => {
  return (
    <Button
      style={{ padding: "4px 12px", fontSize: "11px", minWidth: 120 }}
      variant="custom"
      size="sm"
      color="white"
      target="_blank"
      {...props}
    />
  );
};
