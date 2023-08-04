import { Box, Text, DashedDivider } from "@/ui";

export function PixInformationSection() {
  return (
    <>
      <DashedDivider className="trip-purchase__divider" />
      <Box className="trip-purchase__section">
        <Text heading={true} size="xs">Pix</Text>
        <Text size="lg">Pix não está disponível nesse momento.</Text>
      </Box>
    </>
  );
}
