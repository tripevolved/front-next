import { StepAddress } from "./step-address";
import { StepBuyer } from "./step-buyer";
import { StepPaymentMethods } from "./step-payment-methods";
import { StepSummary } from "./step-summary";
import { StepTravelers } from "./step-travelers";

export const STEPS = [
  {
    name: "Dados da viagem",
    component: StepSummary,
  },
  {
    name: "Dados do comprador",
    component: StepBuyer,
  },
  {
    name: "Endereço de cobrança",
    component: StepAddress,
  },
  {
    name: "Dados dos viajantes",
    component: StepTravelers,
  },
  {
    name: "Finalizar o pagamento",
    component: StepPaymentMethods,
  },
];

export const STEP_NAMES = STEPS.map((step) => step.name);
