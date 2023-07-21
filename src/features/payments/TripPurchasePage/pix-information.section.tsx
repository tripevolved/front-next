import { Box, Text, DashedDivider } from "@/ui";
import { Grid, TextField } from "mars-ds";

export function PixInformationSection() {
  return (
    <>
      <DashedDivider className="trip-purchase__divider" />
      <Box className="trip-purchase__section">
        <Text heading={true} size="xs">Pix</Text>
        
      </Box>
    </>
  );
}
