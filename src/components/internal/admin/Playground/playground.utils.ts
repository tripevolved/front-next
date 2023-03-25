export const preventRecognizedError = (obj: any) => {
  if (typeof obj !== "object") return obj;
  const children = obj["children"];
  const isChildrenValid = typeof children == "string" || Array.isArray(children);
  if (!isChildrenValid) delete obj["children"];

  const style = obj["style"];
  const isStyleValid = typeof style === "object" && !Array.isArray(style);
  if (!isStyleValid) delete obj["style"];

  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj["children"])) obj["children"] = obj["children"].map(preventRecognizedError);

  return obj;
};

export const jsonDefault = [
  {
    component: "SectionBase",
    children: [
      {
        component: "Heading",
        children: "Bem-vindo ao Playground!",
      },
      {
        component: "Text",
        children:
          "Use o editor à direita para começar a escrever o json! Essa edição funciona em tempo real, ou seja, caso algum erro de sintaxe seja encontrado, você verá um erro aparecer, mas não se preocupe, continue a edição que logo as coisas voltam a aparecer ;)",
      },
    ],
  },
];

export const AUTO_SAVE_INTERVAL = 2000;
