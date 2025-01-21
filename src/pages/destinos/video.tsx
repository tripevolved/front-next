import testVideo from '/videos/test.mp4';
import { VerticalVideo } from '@/ui/components/multimedia/VerticalVideo'; 

export default function VideoPageRoute() {
  return <VerticalVideo src={testVideo} />
}