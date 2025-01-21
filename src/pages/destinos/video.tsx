import Video from 'next-video';
import testVideo from '/videos/test.mp4';

export default function VideoPageRoute() {
  return <Video src={testVideo} />
}