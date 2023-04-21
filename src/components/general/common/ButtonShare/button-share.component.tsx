import type { ButtonShareProps } from "./button-share.types";

import copy from "copy-to-clipboard";
import { pageConfig } from "@/configs/page.config";

import { makeClassName } from "@/helpers/classname.helpers";
import { LeadApiService } from "@/services/api/lead-api.service";

import { ModalContent, Picture, Text } from "@/components";
import { Button, ButtonProps, Modal, TextField } from "mars-ds";
import { useRouter } from "next/router";

export function ButtonShare({ className, sx, href, ...props }: ButtonShareProps) {
  const cn = makeClassName("button-share", className)(sx);

  const { query } = useRouter();

  const handleClick = () => {
    const lead = LeadApiService.getLocal();
    const ref = lead ? lead.ref : String(query.ref || "");

    const firstName = lead?.name?.split(" ")[0] || "";
    const link = `${location.origin}/convite?ref=${ref}&inviter=${firstName}`;
    Modal.open(() => <ShareModal link={link} />, { size: "sm" });
    copy(link);
  };

  return (
    <div className={cn}>
      <Button {...props} onClick={handleClick} />
    </div>
  );
}

const IMAGE_OK = "/assets/lancamento/modal-ok.svg";
const socialInvites = [
  {
    name: "WhatsApp",
    iconName: "whatsapp",
    backgroundColor: "#2cb742",
    color: "white",
    url: "https://api.whatsapp.com/send?text={{TEXT}}",
  },
  {
    name: "Facebook",
    iconName: "facebook",
    backgroundColor: "#3b5998",
    color: "white",
    url: "https://www.facebook.com/sharer.php?u={{LINK}}&quote={{TEXT}}",
  },
  {
    name: "Linkedin",
    iconName: "linkedin",
    backgroundColor: "#2867b2",
    color: "white",
    url: "https://www.linkedin.com/sharing/share-offsite/?url={{LINK}}&summary={{TEXT}}&source=TripEvolved",
  },
  {
    name: "Twitter",
    iconName: "twitter",
    backgroundColor: "#01acee",
    color: "white",
    url: "https://twitter.com/intent/tweet?text={{TEXT}}",
  },
  {
    name: "Telegram",
    iconName: "send",
    backgroundColor: "#0288cc",
    color: "white",
    url: "https://t.me/share/url?url={{LINK}}&text={{TEXT}}",
  },
  {
    name: "Email",
    iconName: "mail",
    backgroundColor: "black",
    color: "white",
    url: "mailto:?body={{TEXT}}",
  },
];

const ShareModal = ({ link = pageConfig.url }) => {
  const getHref = (url = "") => {
    const text = encodeURIComponent(
      `Já conhece a Trip Evolved? Você pode ganhar uma viagem gratuita com eles, só precisa entrar para a lista de espera, como eu fiz. Confira aqui no link: ${link}`
    );
    return url.replace("{{TEXT}}", text).replace("{{LINK}}", encodeURIComponent(link));
  };

  return (
    <ModalContent className="text-center">
      <Picture src={IMAGE_OK} />
      <Text className="my-lg" heading size="sm">
        Convide seus amigos!
      </Text>
      <Text>Aumente as suas chances compartilhando o link abaixo:</Text>
      <div className="my-xl text-left">
        <TextField label="Clique para copiar" value={link} readOnly onClick={() => copy(link)} />
      </div>
      <div className="my-xl flex flex-wrap gap-sm justify-content-center">
        {socialInvites.map(({ name, url, ...props }) => (
          <SocialShare key={name} href={getHref(url)} {...props}>
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
