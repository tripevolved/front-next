import { PageApp, PaymentSteps } from "@/features";
import { Logo, SectionBase, Text } from "@/ui";
import { Grid, Icon } from "mars-ds";

export const PaymentPage = () => {
  return (
    <PageApp hideHeader seo={{ title: "Comprar viagem" }}>
      <PaymentSteps />
      <PaymentFooter />
    </PageApp>
  );
};

const PaymentFooter = () => {
  return (
    <SectionBase className="text-center">
      <Grid>
        <Logo />
        <Text className="color-text-secondary">
          Ao finalizar a compra você concorda com os{" "}
          <a href="" target="_blank">
            Termos de Uso
          </a>
        </Text>
        <div className="flex align-items-center justify-content-center gap-md">
          <Icon name="shield" className="color-text-secondary" />
          <Text>
            <strong>Compra segura</strong>
          </Text>
        </div>
      </Grid>
    </SectionBase>
  );
};
