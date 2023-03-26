import type { ButtonShareProps } from "./button-share.types";

import copy from "copy-to-clipboard";
import { pageConfig } from "@/configs/page.config";

import { makeClassName } from "@/helpers/classname.helpers";
import { ensureNotSlashEnds } from "@/helpers/url.helper";

import { CryptoService } from "@/services/secure/crypto.service";
import { LeadApiService } from "@/services/api/lead-api.service";

import { ModalContent, Text } from "@/components";
import { Button, ItemElement, Modal } from "mars-ds";

export function ButtonShare({ className, sx, href, ...props }: ButtonShareProps) {
  const cn = makeClassName("button-share", className)(sx);

  const handleClick = () => {
    const lead = LeadApiService.getLocal();
    const from = lead ? CryptoService.encrypt({ name: lead.name, uid: lead.uid }) : "";
    const link = `${ensureNotSlashEnds(pageConfig.url)}/convite?h=${from}`
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

const ShareModal = ({ link = pageConfig.url }) => {
  return (
    <ModalContent image={IMAGE_OK} className="text-center">
      <Text className="my-md" heading size="xs">
        Seu link foi copiado para a área de transferência
      </Text>
      <ItemElement style={{ overflow: 'auto', textAlign: "left" }}>{link}</ItemElement>
    </ModalContent>
  );
};
