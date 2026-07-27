/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import video from '../../assets/Videos/Firebase_9_-_Setting_up_Firebase_Auth(360p).mp4'
const Video = ({currentVideo}) => {
// console.log(currentVideo);
  return (
    <div className="">
      <MediaPlayer
        title="Sprite Fight"
        autoPlay
        // src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
        src={currentVideo.url}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            // src="https://media-files.vidstack.io/sprite-fight/poster.webp"
            src={currentVideo.poster}
          />
        </MediaProvider>
        <DefaultVideoLayout
        //   thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
};

export default Video;
