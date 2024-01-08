import { AuthSection, PageApp } from "@/features";
import { EmptyState } from "@/ui";
import { Button, Card } from "mars-ds";

export default function AuthSignUpRoute() {
  return (
    <PageApp hideHeader seo={{ title: "Cadastro" }}>
      <AuthSection heading="O cadastro ainda não está disponível para o público geral">
        <Card elevation="md" className="auth-section__card">
          <EmptyState text={"Atualmente, nosso cadastro está disponível somente para as pessoas que participam de nossa lista de espera. Você pode acessá-la através do nosso pré-cadastro e, em breve, vamos conversar com você para liberar o acesso à plataforma da Trip Evolved."} />
        </Card>
        <Button variant="primary" href="/pre-cadastro">Realizar pré-cadastro</Button>
        <Button variant="secondary" href="/">Voltar à home</Button>
      </AuthSection>
    </PageApp>
  );
}
