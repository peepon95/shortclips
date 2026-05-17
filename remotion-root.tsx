import {Composition} from "remotion";
import {StreamToShortsComposition, type StreamToShortsProps} from "@/components/remotion/StreamToShorts";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StreamToShorts"
      component={StreamToShortsComposition}
      durationInFrames={30 * 60}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        sourceUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        logoUrl: "https://placehold.co/180x60?text=Logo"
      } satisfies StreamToShortsProps}
    />
  );
};
