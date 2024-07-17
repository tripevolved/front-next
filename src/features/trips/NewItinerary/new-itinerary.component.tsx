import { Text } from "@/ui";
import { Button } from "mars-ds";

export function NewItinerary({ tripId, title }: any ) {
  return (
    <div className="new-itinerary">
      <div>
      <Text heading size="lg">
        Seu itinerário
      </Text>
      <Text>
        Analisando suas informações, preparamos o seguinte itinerário para você. Ele começa na sua
        cidade e vai até {title}, para que você só tenha o trabalho de curtir a sua viagem. Você
        pode alterar suas escolhas e estamos à disposição para atendê-lo da melhor forma.
      </Text>
      <Button
          variant="neutral"
          href="#"
          size="sm"
          style={{ border: "none", textDecoration: "underline", padding: 0, fontWeight: 500, marginTop: 10}}
        >
          Ver itinerário completo
        </Button>
        </div>
        <div>

        </div>
      </div>
  )
}
