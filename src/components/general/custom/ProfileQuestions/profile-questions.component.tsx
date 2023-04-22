import useSwr from "swr";

import type { ProfileQuestionsProps } from "./profile-questions.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { ProfileApiService } from "@/services/api/profile";
import { Picture, SectionBase, StepsProgressBar } from "@/components";
import { useMemo, useState } from "react";
import { ProfileQuestionsNavigation } from "./profile-questions-navigation";
import { ProfileQuestionsItem } from "./profile-question-item";
import { ProfileQuestionsResponse } from "@/services/api/profile/questions";
import { Caption, Card, Grid } from "mars-ds";

const data2 = [
  {
    page: 1,
    questions: [
      {
        id: "61ff7db1-b128-47e5-9fd9-039058feb92a",
        emoji: "",
        type: "CHECKBOX",
        title: "Quais frases abaixo melhor definem sua viagem ideal?",
        subtitle: null,
        possibleAnswers: [
          {
            id: "eac22146-2ebd-4065-ba6e-3f90f00fd3f5",
            title: "Seguir um roteiro com recomendações populares",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "c4ea20bf-e137-4361-b14d-6767f8dbb12b",
            title: "Me conectar ao meu lado espiritual e/ou à natureza",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "99d87de1-845c-4aff-b976-c0dffb4affa2",
            title: "Ter todo o conforto necessário e relaxar, fugir da rotina",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "fb37aecc-c834-4f3b-a5b3-cdda8a71d9ad",
            title: "Quero conhecer ao máximo das atrações do destino",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "a000d977-e86d-4bf1-b152-8136ed34c2ef",
            title: "Me apaixona mergulhar na cultura local, seja na comida, história ou festas",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "c144959b-281f-41c8-b33f-e1c76bb9115f",
            title: "Sempre quero encontrar momentos raros e fora do comum",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
        ],
      },
    ],
  },
  {
    page: 2,
    questions: [
      {
        id: "1f0d9848-4370-4648-98f5-ceb6d9abd58a",
        emoji: "",
        type: "CHECKBOX",
        title: "Que você valoriza ao escolher um destino para viajar?",
        subtitle: null,
        possibleAnswers: [
          {
            id: "5c2aa0c0-42af-465f-80ec-b5f7f3d4ed93",
            title: "Desconectar da rotina e descansar",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "f8aa91c8-463e-4bde-ad46-652c0dc01864",
            title: "O número de pessoas que comentaram e falaram bem do destino",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "fa645c29-14f7-49a0-9de1-f6c673365179",
            title: "A possibilidade de encontrar e vivenciar experiências que me surpreendam",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "7de7ba08-1990-41b6-8e68-0b8143fd26d1",
            title: "Comidas locais diferentes do que conheço",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
        ],
      },
    ],
  },
  {
    page: 3,
    questions: [
      {
        id: "f76eaa71-f2c5-4621-afdd-38f588991cbd",
        emoji: "",
        type: "RADIO",
        title:
          "Quão disposto você está a se afastar dos roteiros turísticos tradicionais para explorar as culturas locais mais autênticas?",
        subtitle: null,
        possibleAnswers: [
          {
            id: "99e59f63-f312-4dfc-b890-03a6415df0e2",
            title:
              "Tenho muita disposição para me afastar dos roteiros turísticos tradicionais para experimentar e vivenciar a cultura local autêntica",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "7edcc24b-af31-4131-a1d9-c93a0cd9d2f8",
            title:
              "Não tenho disposição para me afastar dos roteiros turísticos tradicionais, pois acredito que eles sejam as melhores opções para conhecer o destino",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "eb8976c5-7b5e-41ac-8c5d-2338cdfccea6",
            title:
              "Posso me afastar um pouco dos roteiros turísticos tradicionais para experimentar algo novo, mas não quero me aventurar muito longe do meu conforto.",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
        ],
      },
    ],
  },
  {
    page: 4,
    questions: [
      {
        id: "6ff4fc15-fade-4d8c-abdc-c8efd1ed993b",
        emoji: "",
        type: "RADIO",
        title:
          "Quando você está procurando uma acomodação, como você equilibra a importância de ter um quarto confortável com uma ótima localização e um bom atendimento?",
        subtitle: null,
        possibleAnswers: [
          {
            id: "3f8621fb-c1c7-46ca-8ddc-cef0434da2d6",
            title:
              "Localização e o atendimento em primeiro lugar, mesmo que isso signifique ficar em um quarto menos confortável",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "18e02658-f40a-499e-8558-9c3eded37373",
            title:
              "Os três fatores são equilibrados igualmente: um quarto confortável, uma ótima localização e um bom atendimento",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
          {
            id: "b4630566-d962-44f7-a3d5-7521b0c8f5df",
            title:
              "Conforto do quarto acima de tudo, mesmo que isso signifique ficar mais longe das principais atrações turísticas ou sacrificar um pouco do atendimento",
            mappingField: null,
            uniqueName: null,
            type: "TEXT",
          },
        ],
      },
    ],
  },
  {
    page: 5,
    questions: [
      {
        id: "2e2ccda3-6b50-4bae-ad7d-987c75f5b752",
        emoji: "",
        type: "CHECKBOX",
        title: "Quais seus destinos dos sonhos?",
        subtitle: null,
        possibleAnswers: [
          {
            id: "5089e114-5f6b-4917-bfbe-cdfcd0352cb3",
            title: "Maldivas",
            mappingField: null,
            uniqueName: "maldivas",
            type: "TEXT",
          },
          {
            id: "12e72e02-67bb-49a3-8dbc-32bb894692b9",
            title: "Dubai",
            mappingField: null,
            uniqueName: "dubai",
            type: "TEXT",
          },
          {
            id: "fd0ae319-8727-4bb2-8e25-dccc9d53a784",
            title: "Cairo",
            mappingField: null,
            uniqueName: "cairo",
            type: "TEXT",
          },
          {
            id: "a4f8a649-8be7-4642-9146-81ae41ec304f",
            title: "Nova York",
            mappingField: null,
            uniqueName: "nova-york",
            type: "TEXT",
          },
          {
            id: "4389c59c-e2ff-4415-a585-d8089b5dec85",
            title: "Istambul",
            mappingField: null,
            uniqueName: "istambul",
            type: "TEXT",
          },
          {
            id: "386cc7d6-8577-471f-9f96-a7929887c49e",
            title: "Bangkok",
            mappingField: null,
            uniqueName: "bangkok",
            type: "TEXT",
          },
          {
            id: "aaaab8c9-e1c6-4694-a4be-545346b227c4",
            title: "Florença",
            mappingField: null,
            uniqueName: "florenca",
            type: "TEXT",
          },
          {
            id: "d6530efe-9e4f-44de-9e79-56175b4f7555",
            title: "Alpes suíços",
            mappingField: null,
            uniqueName: "alpes-suicos",
            type: "TEXT",
          },
          {
            id: "49dd1bc0-7e4c-4da0-8ebd-262643f97785",
            title: "Paris",
            mappingField: null,
            uniqueName: "paris",
            type: "TEXT",
          },
        ],
      },
    ],
  },
] as ProfileQuestionsResponse;

export function ProfileQuestions({ className, children, sx, ...props }: ProfileQuestionsProps) {
  const {
    data = [],
    error,
    isLoading,
  } = useSwr("questions", ProfileApiService.getQuestions, {
    revalidateOnFocus: false,
  });

  const [answers, setAnswers] = useState<any>({});

  const [currentPosition, setCurrentPosition] = useState(0);

  const cn = makeClassName("profile-questions", className)(sx);

  const handleNavigation = (newPosition: number) => {
    if (newPosition < 0) return;
    if (total >= newPosition) setCurrentPosition(newPosition);
    console.log(answers);
  };

  const total = useMemo(() => data.length - 1, [data.length]);

  const style: any = useMemo(() => ({ "--position": currentPosition }), [currentPosition]);

  const handleCheck = (id: string) => (value: string | string[]) => {
    setAnswers((state: any) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      return {
        ...state,
        [id]: isEmptyArray ? null : value,
      };
    });
  };

  const isNextButtonDisabled = () =>
    data[currentPosition].questions.every(({ id }) => !answers[id]);

  if (error) return <div>erro</div>;
  if (isLoading) return <div>carregando...</div>;

  return (
    <SectionBase className={cn} container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Grid as={Card} gap={48}>
        <div>
          <Caption as="p" className="mb-lg profile-questions__caption">
            Descobrir meu perfil de viajante
          </Caption>
          <StepsProgressBar position={currentPosition} total={total} />
        </div>
        <main className="profile-questions__group mb-lg" style={style}>
          {data.map(({ page, questions = [] }) => (
            <div key={page}>
              {questions.map((question) => (
                <ProfileQuestionsItem
                  key={question.id}
                  {...question}
                  onCheck={handleCheck(question.id)}
                />
              ))}
            </div>
          ))}
        </main>
        <ProfileQuestionsNavigation
          position={currentPosition}
          total={total}
          onNavigation={handleNavigation}
          isNextButtonDisabled={isNextButtonDisabled()}
        />
      </Grid>
    </SectionBase>
  );
}
