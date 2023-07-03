import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { Icon } from "mars-ds";

const whatsappLink = getWhatsappLink("Olá, eu gostaria de planejar a minha próxima viagem!");

export function ChatFloatingButton() {
  return (
    <a className="chat-floating-button" href={whatsappLink} target="_blank" rel="noreferrer">
      <Icon name="whatsapp" size="xl" />
    </a>
  );
}
