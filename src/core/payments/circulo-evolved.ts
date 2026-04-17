export type CirculoIncludedItem = {
  title: string;
  description: string;
};

export const CIRCULO_TERMS = {
  serviceTermsHref: "/documentos/circulo-evolved/termos-de-servico",
  serviceTermsLabel: "Termos de Serviço do Círculo Evolved",
  usageTermsHref: "/documentos/termos-de-uso",
  usageTermsLabel: "Termos de Uso",
} as const;

const DESIGN: CirculoIncludedItem = {
  title: "Design de todas as viagens",
  description:
    "Planejamento e desenho completo de cada viagem, sob medida, com roteiro e reservas cuidadas por nossa equipe.",
};

const CURADORIA: CirculoIncludedItem = {
  title: "Curadoria",
  description:
    "Seleção de destinos, experiências e parceiros alinhados ao que você busca — cruzeiros, hospedagens e vivências que fazem sentido para você.",
};

const VALORES: CirculoIncludedItem = {
  title: "Valores sem comissões",
  description:
    "Preços líquidos ou com cashback: as comissões são revertidas em seu benefício, e você vê o valor real da viagem.",
};

export const CIRCULO_INCLUDED_ESSENTIAL: CirculoIncludedItem[] = [CURADORIA, VALORES];
export const CIRCULO_INCLUDED_TOTAL: CirculoIncludedItem[] = [DESIGN, CURADORIA, VALORES];

