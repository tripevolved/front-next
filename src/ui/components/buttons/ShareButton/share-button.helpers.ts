const SOCIAL_SHARING_LIST = [
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

export const getSocialSharingList = (message: string, link = "") => {
  const text = message.replace("{{LINK}}", link);
  return SOCIAL_SHARING_LIST.map(({ url, ...item }) => ({
    ...item,
    href: url
      .replace("{{TEXT}}", encodeURIComponent(text))
      .replace("{{LINK}}", encodeURIComponent(link)),
  }));
};
