import {AbsoluteFill, Img, OffthreadVideo, Sequence, useVideoConfig} from "remotion";

export type StreamToShortsProps = {
  sourceUrl: string;
  speakerUrl?: string;
  logoUrl?: string;
};

export const StreamToShortsComposition: React.FC<StreamToShortsProps> = ({sourceUrl, speakerUrl, logoUrl}) => {
  const {width, height} = useVideoConfig();
  const topHeight = Math.floor(height * 0.6);
  const bottomHeight = height - topHeight;

  return (
    <AbsoluteFill style={{backgroundColor: "black"}}>
      <Sequence from={0}>
        <AbsoluteFill style={{height: topHeight}}>
          <OffthreadVideo src={sourceUrl} style={{width, height: topHeight, objectFit: "cover"}} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={0}>
        <AbsoluteFill style={{top: topHeight, height: bottomHeight}}>
          <OffthreadVideo src={speakerUrl ?? sourceUrl} style={{width, height: bottomHeight, objectFit: "cover"}} />
        </AbsoluteFill>
      </Sequence>
      {logoUrl ? (
        <Img src={logoUrl} style={{position: "absolute", top: 30, right: 30, width: 180}} />
      ) : null}
    </AbsoluteFill>
  );
};
