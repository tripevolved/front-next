import { EmptyState, GlobalLoader, SectionBase, Box, Text } from "@/ui";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useMatchedDestinations } from "./matched-destinations.hook";
import { MatchedDestinationsPageProps } from "./matched-destinations-page.types";
import { MatchedDestinationCard } from "./matched-destination-card.component";
import { OtherChoicesCarousel } from "./other-choices-carousel.component";

export const MatchedDestinationsPage = ({ className, sx, ...props }: MatchedDestinationsPageProps) => {
  const { isLoading, data, error } = useMatchedDestinations();
  const cn = makeCn("has-trip", className)(sx);
  
  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;

  return (
    <SectionBase >
      <Box className={cn} {...props}>
        <Text variant="heading" className="has-trip__header-title" size="sm">
          Sua viagem ideal é para...
        </Text>
        <Box className="has-trip__trip-area">
          <MatchedDestinationCard tripId={data?.tripId!} {...data?.mainChoice!} />
        </Box>
        {data?.otherChoices && data.otherChoices.length > 0 ? (
          <>
            <Box className="has-trip__recommendations-area">
              <OtherChoicesCarousel
                title="Outras opções"
                recommendedDestinations={data.otherChoices.map((matchedDestination, i) => {
                  return {
                    tripId: data.tripId,
                    ...matchedDestination
                  };
                })}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </SectionBase>
  );
}
