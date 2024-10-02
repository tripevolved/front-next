import { TripDetails } from "@/core/types";
import { Picture, Text } from "@/ui";

export const TravelTypeDestination = ({
  travelerProfiles,
}: {
  travelerProfiles: TripDetails["destination"]["travelerProfiles"];
}) => {
  const emojiProfiles = {
    "aventureiro": "⛷️",
    "intelectual": "📚",
    "so-se-vive-uma-vez": "🧗",
    "alternativo": "🌍",
    "relax": "🧘‍♂️",
    "fa-da-rotina": "🛏️",
    "insaciavel": "🗼",
    "dinamico": "🍻",
    "gastronomico": "🍽️",
    "musicalidade": "🎶",
    "espiritual": "🙏",
    "garantido": "🏨",
  } as { [key: string]: string };

  if (travelerProfiles === null) {
    return <></>;
  }

  return (
    <div>
      <Text variant="heading" size="sm">
        Este destino combina com o perfil...
      </Text>
      <div className="flex flex-row gap-sm w-full">
        {travelerProfiles.map((profile) => (
          <div
            key={profile}
            className="px-sm"
            style={{
              height: "32px",
              padding: "auto",
              alignContent: "center",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "16px",
              borderColor: "var(--color-brand-1)",
            }}
          >
            <span style={{ color: "var(--color-brand-1)" }}>
              #{profile}
              {emojiProfiles[profile]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
