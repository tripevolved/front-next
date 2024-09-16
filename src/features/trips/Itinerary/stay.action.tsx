import { TripStaySimplified } from "@/core/types"
import { Button, Modal } from "mars-ds";
import { useCallback } from "react";
import { StayActionDetails } from "./stay.action.details";
import { Picture } from "@/ui";
import { Text } from "@/ui";

interface Props {
    action: TripStaySimplified;
    tripId: string;
}
export const StayAction = ({action,tripId}: Props) => {
    const handleSeeDetails = useCallback(() => {
      const modal = Modal.open(() => <StayActionDetails action={action} tripId={tripId} onCloseModal={() => modal.close()}/>,
      {
        closable: true,
        size: "md",
      })
    }, [])

    return (
        <div className="flex flex-column gap-md py-lg">
            <div className="flex flex-row gap-xl  items-center">
                <Picture
                    src={`/assets/destino/hospedagem.svg`}
                    style={{ width: 40 }}
                />
                <Text as="h3" heading size="xs" className="my-auto">
                    <strong>Hospedagem</strong>
                </Text>
            </div>
            <div className="fleex flex-row pl-20" style={{left:60}}>
                <div className="flex flex-row gap-xl">
                    <Picture src={action.coverImage ?? `/assets/destino/hotel-casa-grande.png`} alt={action.name} style={{width: 50, height: 50}} />
                    <div>
                        <Text as="h1" size="xs" style={{padding: 0}}>
                            <strong >{action.name}</strong>
                        </Text> 
                        <Text as="p" size="xs">
                            <strong style={{color:"var(--color-brand-4"}}>{action.tags}</strong>
                        </Text>
                    </div>
                </div>
                <Button
                    variant="neutral"
                    size="sm"
                    style={{
                        border: "none",
                        textDecoration: "underline",
                        padding: 0,
                        fontWeight: 500,
                        marginTop: 10,
                    }}
                    onClick={handleSeeDetails}
                > Ver Detalhes</Button>
            </div>
        </div>
    )
}