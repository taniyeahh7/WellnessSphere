// import { useState } from "react";
import React from "react";


export default function Curl(){

    // const [videoFeedStopped, setVideoFeedStopped] = useState(false);

    const stopVideoFeed = () => {
        fetch('http://localhost:5000/api/stop_video_feed')
          .then(() => {
            console.log('Video feed has stopped hehe.');
            // setVideoFeedStopped(true);
          })
          .catch(error => console.error('Error:', error));
      };



    return(
        <div className="stream-div">
            <img src="http://localhost:5000/api/video_feed" alt="curl video window" width="690" height="480" className="stream-window"/>
            <button onClick={stopVideoFeed} className="google-stop-stream-btn">Stop Video Feed</button>
        </div>
    )
}