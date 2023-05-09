import type { CardYoutubeProps } from "./card-youtube.types";

import YouTube, { YouTubeEvent } from "react-youtube";

import classNames from "classnames";
import { useState } from "react";
import { Card, CardElevations, Label } from "mars-ds";
import ToggleButton from "../../buttons/ToggleButton/toggle-button.component";

const CardYoutube = ({ children, className, style, videoId, tag, ...props }: CardYoutubeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [video, setVideo] = useState<YouTubeEvent["target"]>(null);

  const videoThumbnail = `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`;

  const handleClick = () => {
    setIsPlaying(true);
    if (video) video.playVideo();
  };

  const handleReady = (event: YouTubeEvent) => setVideo(event.target);

  const computedStyle: any = {
    ...style,
    "--thumbnail": videoThumbnail,
  };

  const cn = classNames("card-youtube", className, {
    "card-youtube--is-playing": isPlaying,
    "card-youtube--is-paused": isPaused,
    "card-youtube--tag": tag,
  });

  return (
    <>
      {tag && <span className="tag__label m-auto">{tag.text}</span>}
      <Card elevation={CardElevations.Low} className={cn} {...props} style={computedStyle}>
        <div className="card-youtube__thumbnail">
          <ToggleButton
            className="card-youtube__play-button"
            iconName="play"
            onClick={handleClick}
          />
        </div>
        <YouTube
          ref={video}
          className="card-youtube__content"
          videoId={videoId}
          onReady={handleReady}
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(false)}
          onEnd={() => setIsPlaying(false)}
          opts={{ playerVars: { rel: 0, showinfo: 0, modestbranding: 0 } }}
        />
        {children}
      </Card>
    </>
  );
};

export default CardYoutube;
