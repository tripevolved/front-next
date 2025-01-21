import { Box } from '@/ui';
import testVideo from '/videos/test_.mp4';
import testHorizontal from "/videos/test-horizontal_.mp4";
import { VerticalVideo } from '@/ui/components/multimedia/VerticalVideo'; 

export default function DiscoverPageRoute() {
  return (
    <Box className='discover'>
      <div className='discover__item'>
        <VerticalVideo src={testVideo} />
      </div>
      <div className='discover__item'>
        <VerticalVideo src={testHorizontal} />
      </div>
    </Box>
  );
}