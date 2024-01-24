import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { Icon } from "mars-ds";

const defaultMessage = "Olá, eu gostaria de planejar a minha próxima viagem!";
const fathersDayMessage =
  "Olá! Gostaria de saber mais sobre o cartão presente para o Dia dos Pais.";

const currentMessage = process.env.MKT_FLAG === "fathers_day" ? fathersDayMessage : defaultMessage;
const whatsappLink = getWhatsappLink(currentMessage);

const ID = "whatsapp-botao-flutuante";

export function ChatFloatingButton() {
  return (
    <a
      className="chat-floating-button"
      id={ID}
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="whatsapp" size="xl" />
    </a>
  );
}
