import Image from "next/image";
import type { TripMatchedDestination } from "@/core/types";

export interface ResultsDestinationCardProps {
  destination: TripMatchedDestination;
  onWantToGo: (id: string) => void;
  isLarge?: boolean;
  isMainChoice?: boolean;
}

// Profile mapping for feature icons
const profileIcons: Record<string, string> = {
  relax: "🌴",
  alternativo: "🎨",
  aventureiro: "🏃",
  gastronomico: "🍽️",
  garantido: "✅",
  intelectual: "📚",
};

export function ResultsDestinationCard({
  destination,
  onWantToGo,
  isMainChoice = false,
  isLarge = false,
}: ResultsDestinationCardProps) {
  // Get match level based on the match score
  const getMatchLevel = () => {
    if (isMainChoice || destination.matchScore >= 90) return "muito-alto";
    if (destination.matchScore >= 85) return "alto";
    return "bom";
  };

  const matchLevel = getMatchLevel();

  // Get match text and icon based on level
  const getMatchInfo = () => {
    switch (matchLevel) {
      case "muito-alto":
        return {
          text: "Ideal para sua viagem",
          icon: "🎯",
          color: "bg-accent-600",
        };
      case "alto":
        return {
          text: "Ótima opção",
          icon: "🎯",
          color: "bg-secondary-600",
        };
      default:
        return {
          text: "Boa opção",
          icon: "🎯",
          color: "bg-secondary-400",
        };
    }
  };

  const matchInfo = getMatchInfo();
  const imageUrl = destination.images[0]?.sources?.[0]?.url || "/assets/blank-image.png";

  // Get icon for a feature based on profile mapping
  const getFeatureIcon = (feature: string): string => {
    // Convert feature to lowercase for case-insensitive matching
    const lowerFeature = feature.toLowerCase();

    // Check if the feature matches any profile key
    for (const [profile, icon] of Object.entries(profileIcons)) {
      if (lowerFeature.includes(profile)) {
        return icon;
      }
    }

    // Default icon if no match found
    return "✨";
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
        isLarge ? "w-full md:w-3/5 mx-auto" : "w-[70%] md:w-full flex-shrink-0"
      } cursor-pointer`}
      onClick={() => onWantToGo(destination.destinationId)}
    >
      <div className={`relative ${isLarge ? "h-[500px]" : "h-[300px]"}`}>
        <Image src={imageUrl} alt={destination.name} fill className="object-cover" />

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Top section with match indicator and feature labels */}
        <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row md:items-start gap-3">
          {/* Match indicator */}
          <div
            className={`${matchInfo.color} text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center self-start shadow-lg z-10 border border-white/20`}
          >
            <span className="mr-1.5 text-base">{matchInfo.icon}</span>
            {matchInfo.text}
          </div>

          {/* Feature labels - horizontal */}
          <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
            {/* Additional features if available */}
            {destination.features?.map((feature, index) => (
              <div
                key={index}
                className="bg-accent-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center"
              >
                <span className="mr-1">{getFeatureIcon(feature)}</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Title and description at bottom */}
        <div className="absolute bottom-8 left-4 right-4 text-white">
          <h2 className="text-xl font-baloo font-bold mb-1">{destination.name}</h2>
          <p className="text-white/90 text-sm line-clamp-2">
            {destination.details || "Destino selecionado para você, esperando uma viagem incrível."}
          </p>
        </div>
      </div>
    </div>
  );
};
