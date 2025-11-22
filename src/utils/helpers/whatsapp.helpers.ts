const WHATSAPP_PHONE = "5551993582462";

export const getWhatsappLink = (message = "", phone = WHATSAPP_PHONE) => {
  const number = encodeURIComponent(phone);
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${number}&text=${text}`;
};
