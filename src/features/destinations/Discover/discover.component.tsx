import { Box } from "@/ui";
import type { DiscoverProps } from "./discover.types";
import { VerticalVideo } from "@/ui/components/multimedia/VerticalVideo";
import testVideo from '/videos/test_.mp4';
import testHorizontal from "/videos/test-horizontal_.mp4";

export function Discover({  }: DiscoverProps) {
  return (
    <Box className="discover">
      <div className="discover__item">
        <VerticalVideo src={testVideo} />
      </div>
      <div className="discover__item">
        <VerticalVideo src={testHorizontal} />
      </div>
    </Box>
  );
}